// External Imports
import Joi from "joi";

// Internal Imports
import { onCall } from "../helpers/functions";
import { db } from "../helpers/admin";
import {
  PublicUserDoc,
  ImmutableUserDoc,
  UserDisplay,
  UserTheme,
  UserColor,
} from "../../../types/firestore";
import {
  COLORS,
  DIRECTIONS,
  ROOT_COLLECTION,
  IMMUTABLE_SUBCOLLECTION,
  SHADES,
  SPACINGS,
} from "../helpers/users/constants";

type CreateUserData = PublicUserDoc & ImmutableUserDoc;

const colorSchemeSchema = Joi.object<UserColor, true>({
  color: Joi.string()
    .required()
    .allow(...COLORS),
  shade: Joi.string()
    .required()
    .allow(...SHADES),
})
  .strict(true)
  .unknown(false);

const createUserDataSchema = Joi.object<CreateUserData, true>({
  name: Joi.string().required(),
  email: Joi.string().required(),
  picture: Joi.string().required().allow(""),
  display: Joi.object<UserDisplay, true>({
    darkMode: Joi.boolean().required().allow(null),
    spacing: Joi.string()
      .required()
      .allow(...SPACINGS),
    direction: Joi.string()
      .required()
      .allow(...DIRECTIONS),
    theme: Joi.object<UserTheme, true>({
      primary: colorSchemeSchema,
      secondary: colorSchemeSchema,
    })
      .strict(true)
      .unknown(false),
  })
    .strict(true)
    .unknown(false),
})
  .strict(true)
  .unknown(false);

const createUser = onCall<CreateUserData>({
  name: "Create User",
  schema: createUserDataSchema,
  handler: async (data, context) => {
    if (!context.auth) {
      throw new Error("Cannot create user as the user is not logged in.");
    }

    const publicData: PublicUserDoc = {
      name: data.name,
      picture: data.picture,
      display: data.display,
    };
    const immutableData: ImmutableUserDoc = {
      email: data.email,
    };

    const ref = db
      .collection(ROOT_COLLECTION)
      .doc(
        context.auth.uid
      ) as FirebaseFirestore.DocumentReference<PublicUserDoc>;
    await ref.create(publicData);

    const immutableRef = ref
      .collection(IMMUTABLE_SUBCOLLECTION)
      .doc(
        context.auth.uid
      ) as FirebaseFirestore.DocumentReference<ImmutableUserDoc>;
    await immutableRef.create(immutableData);
  },
});

export default createUser;
