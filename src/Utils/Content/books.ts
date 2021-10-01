// Internal Imports
import { Book } from "../types";
import { createSorter, compareDates } from "../funcs";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getBooksAuthorFilter,
  getBooksGenreFilter,
  getBooksSearch,
  getBooksSort,
} from "../../Redux";
import { BookSort } from "../../Redux/books.slice";

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

interface Genre {
  label: string;
  amount: number;
}

let genresCache: Genre[] | null = null;

export const getBookGenres = (): Genre[] => {
  if (genresCache) return genresCache;

  const books = getBooks();
  const genres: Genre[] = [];

  books.forEach((book) => {
    book.genres.forEach((genre) => {
      const exists = genres.find((g) => g.label === genre);

      if (exists) {
        exists.amount++;
      } else {
        genres.push({
          label: genre,
          amount: 1,
        });
      }
    });
  });

  genresCache = genres;
  return genres;
};

interface Author {
  label: string;
  image: string;
  amount: number;
}

let authorsCache: Author[] | null = null;

export const getBookAuthors = (): Author[] => {
  if (authorsCache) return authorsCache;

  const books = getBooks();

  const authors = books.reduce((authors, book) => {
    const exists = authors.find((a) => a.label === book.author);

    if (exists) {
      exists.amount++;
      return authors;
    }

    return [
      ...authors,
      {
        label: book.author,
        image: book.authorImage,
        amount: 1,
      },
    ];
  }, [] as Author[]);

  const unique = authors.sort((a, b) => a.label.localeCompare(b.label));
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
  const books = useSortedBooks();

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

export const useSortedBooks = (): Book[] => {
  const sort = useSelector(getBooksSort);
  const sorted = sortBooks(sort);
  return sorted;
};

export const sortBooks = createSorter<BookSort, Book>(
  {
    "Recently Read": (a, b) => {
      if (!a.datesRead) {
        if (!b.datesRead) return 0;
        return 1;
      }
      if (!b.datesRead) {
        return -1;
      }

      const formats = ["MMM YYYY", "MMM DD, YYYY"];

      const aRecent = [...a.datesRead].sort((a, b) =>
        compareDates(a, b, formats)
      )[0];
      const bRecent = [...b.datesRead].sort((a, b) =>
        compareDates(a, b, formats)
      )[0];

      return compareDates(aRecent, bRecent, formats);
    },
    "Recently Published": (a, b) => {
      if (!a.yearPublished) {
        if (!b.yearPublished) return 0;
        return 1;
      }
      if (!b.yearPublished) {
        return -1;
      }

      return parseInt(b.yearPublished) - parseInt(a.yearPublished);
    },
    "Highest Average Rating": (a, b) => {
      if (!a.avgRating) {
        if (!b.avgRating) return 0;
        return 1;
      }
      if (!b.avgRating) {
        return -1;
      }

      return b.avgRating - a.avgRating;
    },
    "Highest Rated by Me": (a, b) => {
      if (!a.rating) {
        if (!b.rating) return 0;
        return 1;
      }
      if (!b.rating) {
        return -1;
      }

      return b.rating - a.rating;
    },
    "Most Pages": (a, b) => {
      if (!a.pages) {
        if (!b.pages) return 0;
        return 1;
      }
      if (!b.pages) {
        return -1;
      }

      return b.pages - a.pages;
    },
    "Most Ratings": (a, b) => b.numRatings - a.numRatings,
    "Most Reviews": (a, b) => b.numReviews - a.numReviews,
  },
  getBooks()
);
