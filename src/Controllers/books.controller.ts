// Firebase Imports
import { BookDoc, WithId } from "../../types/firestore";
import firebase from "../Utils/Config/firebase";
import {
  createDocSnapshot,
  queryCollection,
  updateDoc,
  updateOrCreateDoc,
} from "./helpers/firestore";

const collection = "books" as const;

export const useBookDoc = createDocSnapshot(collection);

export const removeBookLike = (bookId: string, userId: string): Promise<void> =>
  updateDoc(collection, bookId, {
    likes: firebase.firestore.FieldValue.arrayRemove(userId),
  });

export const addBookLike = (bookId: string, userId: string): Promise<void> =>
  updateOrCreateDoc(collection, bookId, {
    likes: firebase.firestore.FieldValue.arrayUnion(userId),
  });

export const getBooksLikedByUser = async (
  userId: string
): Promise<WithId<BookDoc>[]> =>
  queryCollection(collection, {
    field: "likes",
    operation: "array-contains",
    value: userId,
  });
