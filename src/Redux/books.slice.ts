import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type BookSort =
  | "Recently Read"
  | "Recently Published"
  | "Highest Average Rating"
  | "Highest Rated by Me"
  | "Most Pages"
  | "Most Ratings"
  | "Most Reviews";
export const BOOKS_SORT: BookSort[] = [
  "Recently Read",
  "Recently Published",
  "Highest Average Rating",
  "Highest Rated by Me",
  "Most Pages",
  "Most Ratings",
  "Most Reviews",
];

export interface BooksState {
  search: string;
  sort: BookSort;
  genreFilter: string[];
  authorFilter: string[];
}

export const initialBooksState: BooksState = {
  search: "",
  sort: "Recently Read",
  genreFilter: [],
  authorFilter: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState: initialBooksState,
  reducers: {
    setBooksSearch: (state, action: PayloadAction<BooksState["search"]>) => ({
      ...state,
      search: action.payload,
    }),
    setBooksSort: (state, action: PayloadAction<BookSort>) => ({
      ...state,
      sort: action.payload,
    }),
    setBooksGenreFilter: (
      state,
      action: PayloadAction<BooksState["genreFilter"]>
    ) => ({
      ...state,
      genreFilter: action.payload,
    }),
    setBooksAuthorFilter: (
      state,
      action: PayloadAction<BooksState["authorFilter"]>
    ) => ({
      ...state,
      authorFilter: action.payload,
    }),
  },
});

// Actions
export const {
  setBooksSearch,
  setBooksSort,
  setBooksGenreFilter,
  setBooksAuthorFilter,
} = booksSlice.actions;

// Selectors
export const getBooksSearch = (state: RootState): BooksState["search"] =>
  state.books.search;

export const getBooksSort = (state: RootState): BooksState["sort"] =>
  state.books.sort;

export const getBooksGenreFilter = (
  state: RootState
): BooksState["genreFilter"] => state.books.genreFilter;

export const getBooksAuthorFilter = (
  state: RootState
): BooksState["authorFilter"] => state.books.authorFilter;

// Reducer
export const booksReducer = booksSlice.reducer;

export default booksSlice;
