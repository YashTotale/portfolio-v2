import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type ProjectsSort = "Newest" | "Oldest";
export const PROJECTS_SORT: ProjectsSort[] = ["Newest", "Oldest"];

export interface ProjectsState {
  search: string;
  sort: ProjectsSort;
}

export const initialProjectsState: ProjectsState = {
  search: "",
  sort: PROJECTS_SORT[0],
};

const projectsSlice = createSlice({
  name: "search",
  initialState: initialProjectsState,
  reducers: {
    setProjectsSearch: (
      state,
      action: PayloadAction<ProjectsState["search"]>
    ) => ({
      ...state,
      search: action.payload,
    }),
    setProjectsSort: (state, action: PayloadAction<ProjectsSort>) => ({
      ...state,
      sort: action.payload,
    }),
  },
});

// Actions
export const { setProjectsSearch, setProjectsSort } = projectsSlice.actions;

// Selectors

export const getProjectsSearch = (state: RootState): ProjectsState["search"] =>
  state.projects.search;

export const getProjectsSort = (state: RootState): ProjectsState["sort"] =>
  state.projects.sort;

// Reducer
export const projectsReducer = projectsSlice.reducer;

export default projectsSlice;