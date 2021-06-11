import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type ProjectsSort = "Newest" | "Oldest";
export const PROJECTS_SORT: ProjectsSort[] = ["Newest", "Oldest"];

export interface ProjectsState {
  search: string;
  sort: ProjectsSort;
  tagFilter: string[];
  experienceFilter: string[];
}

export const initialProjectsState: ProjectsState = {
  search: "",
  sort: PROJECTS_SORT[0],
  tagFilter: [],
  experienceFilter: [],
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
    setProjectsExperienceFilter: (
      state,
      action: PayloadAction<ProjectsState["experienceFilter"]>
    ) => ({
      ...state,
      experienceFilter: action.payload,
    }),
  },
});

// Actions
export const {
  setProjectsSearch,
  setProjectsSort,
  setProjectsTagFilter,
  setProjectsExperienceFilter,
} = projectsSlice.actions;

// Selectors

export const getProjectsSearch = (state: RootState): ProjectsState["search"] =>
  state.projects.search;

export const getProjectsSort = (state: RootState): ProjectsState["sort"] =>
  state.projects.sort;

export const getProjectsTagFilter = (
  state: RootState
): ProjectsState["tagFilter"] => state.projects.tagFilter;

export const getProjectsExperienceFilter = (
  state: RootState
): ProjectsState["experienceFilter"] => state.projects.experienceFilter;

// Reducer
export const projectsReducer = projectsSlice.reducer;

export default projectsSlice;
