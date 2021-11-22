// React Imports
import { useEffect, useState } from "react";
import { useFirestoreDocDataOnce } from "reactfire";

// Firebase Imports
import { arrayRemove, arrayUnion } from "firebase/firestore";
import {
  getCollectionRef,
  getDocRef,
  queryCollection,
  updateDoc,
  updateOrCreateDoc,
} from "./helpers/firestore";
import { BookDoc, WithId } from "../../types/firestore";

export const booksCollection = "books" as const;
export const booksCollectionRef = getCollectionRef(booksCollection);

export const removeBookLike = (bookId: string, userId: string): Promise<void> =>
  updateDoc(booksCollectionRef, bookId, {
    likes: arrayRemove(userId),
  });

export const addBookLike = (bookId: string, userId: string): Promise<void> =>
  updateOrCreateDoc(booksCollectionRef, bookId, {
    likes: arrayUnion(userId),
  });

export const useBookLikesOnce = (
  bookId: string
): [
  string[],
  (uid: string) => Promise<void>,
  (uid: string) => Promise<void>
] => {
  const { status, data } = useFirestoreDocDataOnce(
    getDocRef(booksCollectionRef, bookId)
  );
  const [likes, setLikes] = useState(data?.likes ?? []);

  const addLike = async (uid: string) => {
    await addBookLike(bookId, uid);
    setLikes(likes.concat(uid));
  };

  const removeLike = async (uid: string) => {
    await removeBookLike(bookId, uid);
    setLikes(likes.filter((u) => u !== uid));
  };

  useEffect(() => {
    if (status === "success") {
      setLikes(data?.likes ?? []);
    }
  }, [status, data?.likes]);

  return [likes, addLike, removeLike];
};

export const getBooksLikedByUser = async (
  userId: string
): Promise<WithId<BookDoc>[]> =>
  queryCollection(booksCollectionRef, {
    field: "likes",
    operation: "array-contains",
    value: userId,
  });
