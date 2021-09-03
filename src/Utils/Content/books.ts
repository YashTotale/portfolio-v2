// Internal Imports
import { Book } from "../types";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getBooksAuthorFilter,
  getBooksGenreFilter,
  getBooksSearch,
} from "../../Redux";

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

let genresCache: string[] | null = null;

export const getBookGenres = (): string[] => {
  if (genresCache) return genresCache;

  const books = getBooks();

  const genres = books.reduce((genres, book) => {
    return [...genres, ...book.genres];
  }, [] as string[]);

  const unique = [...new Set(genres)].sort((a, b) => a.localeCompare(b));
  genresCache = unique;
  return unique;
};

interface Author {
  name: string;
  image: string;
}

let authorsCache: Author[] | null = null;

export const getBookAuthors = (): Author[] => {
  if (authorsCache) return authorsCache;

  const books = getBooks();
  const encountered: Record<string, boolean> = {};

  const authors = books.reduce((authors, book) => {
    if (encountered[book.author]) return authors;
    encountered[book.author] = true;

    return [
      ...authors,
      {
        name: book.author,
        image: book.authorImage,
      },
    ];
  }, [] as Author[]);

  const unique = authors.sort((a, b) => a.name.localeCompare(b.name));
  authorsCache = unique;
  return unique;
};

export const checkGenres = (b: Book, genres: string[]): boolean => {
  if (!genres.length) return true;
  return b.genres.some((genre) => genres.includes(genre));
};

export const checkAuthors = (b: Book, authors: string[]): boolean => {
  if (!authors.length) return true;
  return authors.includes(b.author);
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

  const genreFilter = useSelector(getBooksGenreFilter);
  const authorFilter = useSelector(getBooksAuthorFilter);

  const search = useSelector(getBooksSearch);
  const normalizedSearch = search.toLowerCase();

  return books.filter((b) => {
    if (!checkGenres(b, genreFilter)) return false;
    if (!checkAuthors(b, authorFilter)) return false;
    if (!checkSearch(b, normalizedSearch)) return false;

    return true;
  });
};
