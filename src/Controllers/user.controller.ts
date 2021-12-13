// External Imports
import { User, updateProfile } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  DocumentReference,
} from "firebase/firestore";

// Internal Imports
import { createDoc, getCollection, updateDoc } from "./helpers/firestore";
import { uploadFile } from "./helpers/storage";
import { UserDoc, UserDisplay } from "../../types/firestore";

const userCollection = "users" as const;
export const userCollectionRef = getCollection<UserDoc>(userCollection);
export const getUserDocRef = (uid: string): DocumentReference<UserDoc> =>
  doc(userCollectionRef, uid);

export const createUser = async (
  user: User,
  display: UserDoc["display"]
): Promise<void> => {
  const data: UserDoc = {
    name: user.displayName ?? "",
    email: user.email ?? "",
    picture: user.photoURL ?? "",
    display,
    likedBooks: [],
  };
  return await createDoc(userCollectionRef, data, user.uid);
};

export const deleteUser = async (uid: string): Promise<void> => {
  const doc = getUserDocRef(uid);
  return await deleteDoc(doc);
};

export const updateUserName = async (
  user: User,
  newName: string
): Promise<void> => {
  await updateDoc(userCollectionRef, user.uid, { name: newName });
  await updateProfile(user, {
    displayName: newName,
  });
};

export const uploadUserPicture = async (
  file: File,
  user: User
): Promise<void> => {
  const url = await uploadFile(file, {
    path: `users/${user.uid}/profile_pictures`,
  });
  await updateDoc(userCollectionRef, user.uid, { picture: url });
  await updateProfile(user, {
    photoURL: url,
  });
};

export const updateUserDisplay = (
  uid: string,
  display: UserDisplay
): Promise<void> => updateDoc(userCollectionRef, uid, { display });

export const addLikedBook = (uid: string, bookId: string): Promise<void> =>
  updateDoc(userCollectionRef, uid, { likedBooks: arrayUnion(bookId) });

export const removeLikedBook = (uid: string, bookId: string): Promise<void> =>
  updateDoc(userCollectionRef, uid, { likedBooks: arrayRemove(bookId) });
