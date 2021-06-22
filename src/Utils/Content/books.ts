// Internal Imports
import { Book } from "../types";

// Redux Imports
import { useSelector } from "react-redux";
import { getBooksSearch } from "../../Redux";

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

const searchCache: Record<string, Record<string, boolean>> = {};

export const checkSearch = (b: Book, search: string): boolean => {
  if (!search.length) return true;
  if (!searchCache[b.id]) searchCache[b.id] = {};

  const cache = searchCache[b.id][search];
  if (typeof cache === "boolean") return cache;

  const matches: (boolean | undefined)[] = [
    b.title.toLowerCase().includes(search),
    b.author.toLowerCase().includes(search),
    b.rating?.toLocaleString().toLowerCase().includes(search),
    b.datesRead?.some((date) => date.includes(search)),
    b.pages?.toLocaleString().toLowerCase().includes(search),
    b.yearPublished?.toLowerCase().includes(search),
    b.genres.some((g) => g.toLowerCase().includes(search)),
    b.avgRating.toLocaleString().toLowerCase().includes(search),
    b.numRatings.toLocaleString().toLowerCase().includes(search),
    b.numReviews.toLocaleString().toLowerCase().includes(search),
  ];

  const result = matches.includes(true);
  searchCache[b.id][search] = result;
  return result;
};

export const useFilteredBooks = (): Book[] => {
  const books = getBooks();

  const search = useSelector(getBooksSearch);
  const normalizedSearch = search.toLowerCase();

  return books.filter((b) => {
    if (!checkSearch(b, normalizedSearch)) return false;

    return true;
  });
};
