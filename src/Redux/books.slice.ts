import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export interface BooksState {
  search: string;
}

export const initialBooksState: BooksState = {
  search: "",
};

const booksSlice = createSlice({
  name: "books",
  initialState: initialBooksState,
  reducers: {
    setBooksSearch: (state, action: PayloadAction<BooksState["search"]>) => ({
      ...state,
      search: action.payload,
    }),
  },
});

// Actions
export const { setBooksSearch } = booksSlice.actions;

// Selectors
export const getBooksSearch = (state: RootState): BooksState["search"] =>
  state.books.search;

// Reducer
export const booksReducer = booksSlice.reducer;

export default booksSlice;
