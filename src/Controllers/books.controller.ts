// Firebase Imports
import { arrayRemove, arrayUnion } from "firebase/firestore";
import {
  createDocSnapshot,
  queryCollection,
  updateDoc,
  updateOrCreateDoc,
} from "./helpers/firestore";
import { BookDoc, WithId } from "../../types/firestore";

const collection = "books" as const;

export const useBookDoc = createDocSnapshot(collection);

export const removeBookLike = (bookId: string, userId: string): Promise<void> =>
  updateDoc(collection, bookId, {
    likes: arrayRemove(userId),
  });

export const addBookLike = (bookId: string, userId: string): Promise<void> =>
  updateOrCreateDoc(collection, bookId, {
    likes: arrayUnion(userId),
  });

export const getBooksLikedByUser = async (
  userId: string
): Promise<WithId<BookDoc>[]> =>
  queryCollection(collection, {
    field: "likes",
    operation: "array-contains",
    value: userId,
  });
