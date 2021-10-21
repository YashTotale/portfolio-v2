// Firebase Imports
import {
  Collection,
  createDocSnapshot,
  updateDoc,
  updateOrCreateDoc,
} from "./firestore.helpers";
import firebase from "../Utils/Config/firebase";

export interface BookDoc {
  likes: string[];
}

export const useBookDoc = createDocSnapshot<BookDoc>(Collection.Books);

export const removeBookLike = (bookId: string, userId: string): Promise<void> =>
  updateDoc(Collection.Books, bookId, {
    likes: firebase.firestore.FieldValue.arrayRemove(userId),
  });

export const addBookLike = (bookId: string, userId: string): Promise<void> =>
  updateOrCreateDoc(Collection.Books, bookId, {
    likes: firebase.firestore.FieldValue.arrayUnion(userId),
  });
