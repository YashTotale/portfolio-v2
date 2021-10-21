// Firebase Imports
import {
  createDocSnapshot,
  updateDoc,
  updateOrCreateDoc,
} from "./firestore.helpers";
import firebase from "../Utils/Config/firebase";

const collection = "books" as const;

export interface BookDoc {
  likes: string[];
}

export const useBookDoc = createDocSnapshot(collection);

export const removeBookLike = (bookId: string, userId: string): Promise<void> =>
  updateDoc(collection, bookId, {
    likes: firebase.firestore.FieldValue.arrayRemove(userId),
  });

export const addBookLike = (bookId: string, userId: string): Promise<void> =>
  updateOrCreateDoc(collection, bookId, {
    likes: firebase.firestore.FieldValue.arrayUnion(userId),
  });
