import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type ExperienceSort = "Latest" | "Earliest";
export const EXPERIENCE_SORT: ExperienceSort[] = ["Latest", "Earliest"];

export interface ExperienceState {
  search: string;
  sort: ExperienceSort;
  tagFilter: string[];
}

export const initialExperienceState: ExperienceState = {
  search: "",
  sort: EXPERIENCE_SORT[0],
  tagFilter: [],
};

const experienceSlice = createSlice({
  name: "experience",
  initialState: initialExperienceState,
  reducers: {
    setExperienceSearch: (
      state,
      action: PayloadAction<ExperienceState["search"]>
    ) => ({
      ...state,
      search: action.payload,
    }),
    setExperienceSort: (state, action: PayloadAction<ExperienceSort>) => ({
      ...state,
      sort: action.payload,
    }),
    setExperienceTagFilter: (
      state,
      action: PayloadAction<ExperienceState["tagFilter"]>
    ) => ({
      ...state,
      tagFilter: action.payload,
    }),
  },
});

// Actions
export const {
  setExperienceSearch,
  setExperienceSort,
  setExperienceTagFilter,
} = experienceSlice.actions;

// Selectors
export const getExperienceSearch = (
  state: RootState
): ExperienceState["search"] => state.experience.search;

export const getExperienceSort = (state: RootState): ExperienceState["sort"] =>
  state.experience.sort;

export const getExperienceTagFilter = (
  state: RootState
): ExperienceState["tagFilter"] => state.experience.tagFilter;

// Reducer
export const experienceReducer = experienceSlice.reducer;

export default experienceSlice;
