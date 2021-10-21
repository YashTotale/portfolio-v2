// React Imports
import { useUser } from "../Context/UserContext";

// Firebase Imports
import "firebase/auth";
import {
  createDoc,
  createDocSnapshot,
  Nullable,
  updateDoc,
  WithId,
} from "./firestore.helpers";
import firebase from "../Utils/Config/firebase";
import { uploadFile } from "./storage.helpers";

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

export const createUser = (user: firebase.User): Promise<UserDoc> =>
  createDoc(
    collection,
    {
      name: user.displayName ?? "",
      email: user.email ?? "",
      picture: user.photoURL ?? "",
    },
    user.uid
  );

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
