import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export interface BooksState {
  search: string;
  genreFilter: string[];
}

export const initialBooksState: BooksState = {
  search: "",
  genreFilter: [],
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
  },
});

// Actions
export const { setBooksSearch, setBooksGenreFilter } = booksSlice.actions;

// Selectors
export const getBooksSearch = (state: RootState): BooksState["search"] =>
  state.books.search;

export const getBooksGenreFilter = (
  state: RootState
): BooksState["genreFilter"] => state.books.genreFilter;

// Reducer
export const booksReducer = booksSlice.reducer;

export default booksSlice;
