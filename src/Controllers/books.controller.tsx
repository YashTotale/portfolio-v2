// Internal Imports
import { createDocSnapshot, updateDoc } from "./index";
import firebase from "../Utils/Config/firebase";

interface BookDoc {
  likes: string[];
}

export const useBookDoc = createDocSnapshot<BookDoc>("books");

export const removeBookLike = (bookId: string, userId: string): Promise<void> =>
  updateDoc("books", bookId, {
    likes: firebase.firestore.FieldValue.arrayRemove(userId),
  });

export const addBookLike = (bookId: string, userId: string): Promise<void> =>
  updateDoc("books", bookId, {
    likes: firebase.firestore.FieldValue.arrayUnion(userId),
  });
