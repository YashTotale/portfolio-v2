import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export interface SearchState {
  projects: string;
}

export const initialSearchState: SearchState = {
  projects: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setProjectsSearch: (state, action: PayloadAction<string>) => ({
      ...state,
      projects: action.payload,
    }),
  },
});

// Actions
export const { setProjectsSearch } = searchSlice.actions;

// Selectors
export const getProjectsSearch = (state: RootState): SearchState["projects"] =>
  state.search.projects;

// Reducer
export const searchReducer = searchSlice.reducer;

export default searchSlice;
