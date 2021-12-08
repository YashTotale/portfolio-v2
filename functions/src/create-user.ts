// External Imports
import Joi from "joi";

// Internal Imports
import { onCall } from "./helpers/functions";
import { db } from "./helpers/admin";
import {
  PublicUserDoc,
  ImmutableUserDoc,
  Spacing,
  Direction,
  UserDisplay,
  UserTheme,
  UserColor,
  Color,
  Shade,
} from "../../types/firestore";

type CreateUserData = PublicUserDoc & ImmutableUserDoc;

const SPACINGS_OBJ: Record<Spacing, null> = {
  "6": null,
  "8": null,
  "10": null,
};
const SPACINGS = Object.keys(SPACINGS_OBJ);

const DIRECTIONS_OBJ: Record<Direction, null> = {
  ltr: null,
  rtl: null,
};
const DIRECTIONS = Object.keys(DIRECTIONS_OBJ);

const COLORS_OBJ: Record<Color, null> = {
  amber: null,
  blue: null,
  cyan: null,
  deepOrange: null,
  deepPurple: null,
  green: null,
  indigo: null,
  lightBlue: null,
  lightGreen: null,
  lime: null,
  orange: null,
  pink: null,
  purple: null,
  red: null,
  teal: null,
  yellow: null,
};
const COLORS = Object.keys(COLORS_OBJ);

const SHADES_OBJ: Record<Shade, null> = {
  "100": null,
  "200": null,
  "300": null,
  "400": null,
  "50": null,
  "500": null,
  "600": null,
  "700": null,
  "800": null,
  "900": null,
  A100: null,
  A200: null,
  A400: null,
  A700: null,
};
const SHADES = Object.keys(SHADES_OBJ);

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
  name: "Create User Doc",
  schema: createUserDataSchema,
  handler: async (data, context) => {
    if (!context.auth) {
      throw new Error("Cannot create user doc as the user is not logged in.");
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
      .collection("users")
      .doc(
        context.auth.uid
      ) as FirebaseFirestore.DocumentReference<PublicUserDoc>;
    await ref.create(publicData);

    const immutableRef = ref
      .collection("immutable")
      .doc(
        context.auth.uid
      ) as FirebaseFirestore.DocumentReference<ImmutableUserDoc>;
    await immutableRef.create(immutableData);
  },
});

export default createUser;
