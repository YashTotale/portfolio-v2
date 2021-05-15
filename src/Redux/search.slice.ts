import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export interface SearchState {
  projects: string;
  experience: string;
}

export const initialSearchState: SearchState = {
  projects: "",
  experience: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setProjectsSearch: (state, action: PayloadAction<string>) => ({
      ...state,
      projects: action.payload,
    }),
    setExperienceSearch: (state, action: PayloadAction<string>) => ({
      ...state,
      experience: action.payload,
    }),
  },
});

// Actions
export const { setProjectsSearch, setExperienceSearch } = searchSlice.actions;

// Selectors
export const getProjectsSearch = (state: RootState): SearchState["projects"] =>
  state.search.projects;

export const getExperienceSearch = (
  state: RootState
): SearchState["experience"] => state.search.experience;

// Reducer
export const searchReducer = searchSlice.reducer;

export default searchSlice;
