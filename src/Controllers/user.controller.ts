// React Imports
import { useUser } from "../Context/UserContext";

// Firebase Imports
import "firebase/auth";
import firebase from "../Utils/Config/firebase";
import {
  createDocSnapshot,
  Nullable,
  updateDoc,
  WithId,
} from "./helpers/firestore";
import { uploadFile } from "./helpers/storage";
import { httpsCallable } from "./helpers/functions";

const collection = "users" as const;

export interface UserDoc {
  name: string;
  email: string;
  picture: string;
}

export const useUserDoc = (): Nullable<WithId<UserDoc>> => {
  const user = useUser();
  const useDocHook = createDocSnapshot(collection);
  const doc = useDocHook(user?.uid ?? "");
  return doc;
};

export const createUser = async (
  user: firebase.User
): Promise<firebase.functions.HttpsCallableResult> =>
  await httpsCallable("createUserDoc", {
    name: user.displayName ?? "",
    email: user.email ?? "",
    picture: user.photoURL ?? "",
  });

export const updateUserName = (
  userId: string,
  newName: string
): Promise<void> => updateDoc(collection, userId, { name: newName });

export const uploadUserPicture = async (
  file: File,
  userId: string
): Promise<void> => {
  const url = await uploadFile(file, {
    path: `users/${userId}`,
    fileName: "profile_picture",
  });
  return await updateDoc(collection, userId, { picture: url });
};
