import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type ProjectsSort = "Newest" | "Oldest";
export const PROJECTS_SORT: ProjectsSort[] = ["Newest", "Oldest"];

export interface ProjectsState {
  search: string;
  sort: ProjectsSort;
  tagFilter: string[];
}

export const initialProjectsState: ProjectsState = {
  search: "",
  sort: PROJECTS_SORT[0],
  tagFilter: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState: initialProjectsState,
  reducers: {
    setProjectsSearch: (
      state,
      action: PayloadAction<ProjectsState["search"]>
    ) => ({
      ...state,
      search: action.payload,
    }),
    setProjectsSort: (state, action: PayloadAction<ProjectsState["sort"]>) => ({
      ...state,
      sort: action.payload,
    }),
    setProjectsTagFilter: (
      state,
      action: PayloadAction<ProjectsState["tagFilter"]>
    ) => ({
      ...state,
      tagFilter: action.payload,
    }),
  },
});

// Actions
export const {
  setProjectsSearch,
  setProjectsSort,
  setProjectsTagFilter,
} = projectsSlice.actions;

// Selectors

export const getProjectsSearch = (state: RootState): ProjectsState["search"] =>
  state.projects.search;

export const getProjectsSort = (state: RootState): ProjectsState["sort"] =>
  state.projects.sort;

export const getProjectsTagFilter = (
  state: RootState
): ProjectsState["tagFilter"] => state.projects.tagFilter;

// Reducer
export const projectsReducer = projectsSlice.reducer;

export default projectsSlice;
