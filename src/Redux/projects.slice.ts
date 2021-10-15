import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export const PROJECTS_SORT = ["Default", "Alphabetically", "Newest"] as const;
export type ProjectsSort = typeof PROJECTS_SORT[number];

export interface ProjectsState {
  search: string;
  sort: ProjectsSort;
  viewable: string[];
  experienceFilter: string | null;
  tagFilter: string[];
}

export const initialProjectsState: ProjectsState = {
  search: "",
  sort: PROJECTS_SORT[0],
  viewable: [],
  experienceFilter: null,
  tagFilter: [],
};

const projectsSlice = createSlice({
  name: "articles",
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
    addProjectViewable: (state, action: PayloadAction<string>) => ({
      ...state,
      viewable: [...state.viewable, action.payload],
    }),
    removeProjectViewable: (state, action: PayloadAction<string>) => ({
      ...state,
      viewable: state.viewable.filter((v) => v !== action.payload),
    }),
    removeAllProjectViewable: (state) => ({
      ...state,
      viewable: [],
    }),
  },
});

// Actions
export const {
  setProjectsSearch,
  setProjectsSort,
  setProjectsTagFilter,
  setProjectsExperienceFilter,
  addProjectViewable,
  removeProjectViewable,
  removeAllProjectViewable,
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

export const getProjectsViewable = (
  state: RootState
): ProjectsState["viewable"] => state.projects.viewable;

// Reducer
export const projectsReducer = projectsSlice.reducer;

export default projectsSlice;
