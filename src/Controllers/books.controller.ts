// Internal Imports
import { getCollection, useDocFieldOnce } from "./helpers/firestore";
import { BookDoc } from "../../types/firestore";

export const booksCollection = "books" as const;
export const booksCollectionRef = getCollection<BookDoc>(booksCollection);

export const useBookLikesOnce = (
  bookId: string
): [number, () => void, () => void] => {
  const [rawLikes, setLikes] = useDocFieldOnce(
    booksCollectionRef,
    bookId,
    "numLikes"
  );
  const likes = rawLikes ?? 0;

  const addLike = async () => {
    setLikes(likes + 1);
  };

  const removeLike = async () => {
    setLikes(likes - 1);
  };

  return [likes, addLike, removeLike];
};
