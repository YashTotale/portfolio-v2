// External Imports
import { CollectionReference } from "firebase-admin/firestore";

// Internal Imports
import { db } from "./admin";
import { BookDoc } from "../../../types/firestore";

export const BOOKS_COLLECTION = "books" as const;
export const booksCollection = db.collection(
  BOOKS_COLLECTION
) as CollectionReference<BookDoc>;
export const bookDoc = (id: string) => booksCollection.doc(id);
