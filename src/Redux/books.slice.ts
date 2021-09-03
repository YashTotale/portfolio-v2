import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export interface BooksState {
  search: string;
  genreFilter: string[];
  authorFilter: string[];
}

export const initialBooksState: BooksState = {
  search: "",
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
  setBooksGenreFilter,
  setBooksAuthorFilter,
} = booksSlice.actions;

// Selectors
export const getBooksSearch = (state: RootState): BooksState["search"] =>
  state.books.search;

export const getBooksGenreFilter = (
  state: RootState
): BooksState["genreFilter"] => state.books.genreFilter;

export const getBooksAuthorFilter = (
  state: RootState
): BooksState["authorFilter"] => state.books.authorFilter;

// Reducer
export const booksReducer = booksSlice.reducer;

export default booksSlice;
