// Internal Imports
import { Book } from "../types";

// Data Imports
import books from "../../Data/book.json";

export const getBooks = (): Book[] => {
  return (Object.values(books) as unknown) as Book[];
};

export const getRawBook = (id: string): Book | null => {
  const all = (books as unknown) as Record<string, Book>;
  const single = all[id];

  if (!single) return null;
  return single;
};
