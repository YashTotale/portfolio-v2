// Firebase Imports
import {
  arrayRemove,
  arrayUnion,
  Query,
  query,
  where,
} from "firebase/firestore";
import {
  getCollection,
  updateDoc,
  updateOrCreateDoc,
  useCollectionQueryOnce,
  useDocFieldOnce,
} from "./helpers/firestore";
import { BookDoc, WithId } from "../../types/firestore";

export const booksCollection = "books" as const;
export const booksCollectionRef = getCollection<BookDoc>(booksCollection);

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
  const [rawLikes, setLikes] = useDocFieldOnce(
    booksCollectionRef,
    bookId,
    "likes"
  );
  const likes = rawLikes ?? [];

  const addLike = async (uid: string) => {
    await addBookLike(bookId, uid);
    setLikes(likes.concat(uid));
  };

  const removeLike = async (uid: string) => {
    await removeBookLike(bookId, uid);
    setLikes(likes.filter((u) => u !== uid));
  };

  return [likes, addLike, removeLike];
};

const userBooksQueryCache: Record<string, Query<BookDoc>> = {};

export const useBooksLikedByUserOnce = (userId: string): WithId<BookDoc>[] => {
  if (!userBooksQueryCache[userId]) {
    userBooksQueryCache[userId] = query(
      booksCollectionRef,
      where("likes", "array-contains", userId)
    );
  }
  const q = userBooksQueryCache[userId];
  return useCollectionQueryOnce(q);
};
