// Firebase Imports
import { User, updateProfile } from "firebase/auth";
import { HttpsCallableResult } from "firebase/functions";
import {
  CollectionReference,
  doc,
  DocumentReference,
} from "firebase/firestore";
import {
  getCollectionRef,
  getSubCollectionRef,
  updateDoc,
} from "./helpers/firestore";
import { uploadFile } from "./helpers/storage";
import { httpsCallable } from "./helpers/functions";
import {
  PublicUserDoc,
  ImmutableUserDoc,
  UserDisplay,
} from "../../types/firestore";

const publicCollection = "users" as const;
export const publicCollectionRef = getCollectionRef(publicCollection);

const immutableCollection = "immutable" as const;
export const getImmutableCollectionRef = (
  uid: string
): CollectionReference<ImmutableUserDoc> =>
  getSubCollectionRef(publicCollection, uid, immutableCollection);
export const getImmutableDocRef = (
  uid: string
): DocumentReference<ImmutableUserDoc> =>
  doc(getImmutableCollectionRef(uid), uid);

export const createUser = async (
  user: User,
  display: PublicUserDoc["display"]
): Promise<HttpsCallableResult> => {
  const data: PublicUserDoc & ImmutableUserDoc = {
    name: user.displayName ?? "",
    email: user.email ?? "",
    picture: user.photoURL ?? "",
    display,
  };
  return await httpsCallable("createUser", data);
};

export const deleteUser = (): Promise<HttpsCallableResult> =>
  httpsCallable("deleteUser");

export const updateUserName = async (
  user: User,
  newName: string
): Promise<void> => {
  await Promise.all([
    updateDoc(publicCollectionRef, user.uid, { name: newName }),
    updateProfile(user, {
      displayName: newName,
    }),
  ]);
};

export const uploadUserPicture = async (
  file: File,
  user: User
): Promise<void> => {
  const url = await uploadFile(file, {
    path: `users/${user.uid}/profile_pictures`,
  });
  await Promise.all([
    updateDoc(publicCollectionRef, user.uid, { picture: url }),
    updateProfile(user, {
      photoURL: url,
    }),
  ]);
};

export const updateUserDisplay = (
  uid: string,
  display: UserDisplay
): Promise<void> => updateDoc(publicCollectionRef, uid, { display });
