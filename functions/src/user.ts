// External Imports
import Joi from "joi";
import { firestore } from "./helpers/admin";

// Internal Imports
import { onCall } from "./helpers/functions";

interface UserDoc {
  name: string;
  email: string;
  picture: string;
}

type CreateUserData = UserDoc;

const createUserDataSchema = Joi.object<CreateUserData, true>({
  name: Joi.string().required().allow(""),
  email: Joi.string().required().allow(""),
  picture: Joi.string().required().allow(""),
});

export const createUserDoc = onCall<CreateUserData>({
  name: "Create User Doc",
  schema: createUserDataSchema,
  handler: async (data, context) => {
    if (!context.auth) {
      throw new Error("Cannot create user doc as the user is not logged in.");
    }

    const ref = firestore
      .collection("users")
      .doc(context.auth.uid) as FirebaseFirestore.DocumentReference<UserDoc>;
    await ref.create(data);
  },
});
