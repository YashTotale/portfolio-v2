// React Imports
import { useUser } from "../Context/UserContext";

// Firebase Imports
import "firebase/auth";
import {
  Collection,
  createDoc,
  createDocSnapshot,
  Nullable,
  updateDoc,
  WithId,
} from "./firestore.helpers";
import firebase from "../Utils/Config/firebase";
import { uploadFile } from "./storage.helpers";

export interface UserDoc {
  name: string;
  email: string;
  picture: string;
}

export const useUserDoc = (): Nullable<WithId<UserDoc>> => {
  const user = useUser();
  const useDocHook = createDocSnapshot<UserDoc>(Collection.Users);
  const doc = useDocHook(user?.uid ?? "");
  return doc;
};

export const createUser = (user: firebase.User): Promise<UserDoc> =>
  createDoc<UserDoc>(
    Collection.Users,
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
): Promise<void> => updateDoc(Collection.Users, userId, { name: newName });

export const uploadUserPicture = async (
  file: File,
  userId: string
): Promise<void> => {
  const url = await uploadFile(file, {
    path: `users/${userId}`,
    fileName: "profile_picture",
  });
  return await updateDoc(Collection.Users, userId, { picture: url });
};
