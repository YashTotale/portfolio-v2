import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type ProjectsSort = "Newest" | "Oldest";
export const PROJECTS_SORT: ProjectsSort[] = ["Newest", "Oldest"];

export interface SortState {
  projects: ProjectsSort;
  experience: string;
}

export const initialSortState: SortState = {
  projects: PROJECTS_SORT[0],
  experience: "",
};

const sortSlice = createSlice({
  name: "search",
  initialState: initialSortState,
  reducers: {
    setProjectsSort: (state, action: PayloadAction<ProjectsSort>) => ({
      ...state,
      projects: action.payload,
    }),
    setExperienceSort: (state, action: PayloadAction<string>) => ({
      ...state,
      experience: action.payload,
    }),
  },
});

// Actions
export const { setProjectsSort, setExperienceSort } = sortSlice.actions;

// Selectors
export const getProjectsSort = (state: RootState): SortState["projects"] =>
  state.sort.projects;

export const getExperienceSort = (state: RootState): SortState["experience"] =>
  state.sort.experience;

// Reducer
export const sortReducer = sortSlice.reducer;

export default sortSlice;
