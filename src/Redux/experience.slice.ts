import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type ExperienceSort = "Latest" | "Earliest";
export const EXPERIENCE_SORT: ExperienceSort[] = ["Latest", "Earliest"];

export interface ExperienceState {
  scroll: string | null;
  search: string;
  sort: ExperienceSort;
}

export const initialExperienceState: ExperienceState = {
  scroll: null,
  search: "",
  sort: EXPERIENCE_SORT[0],
};

const experienceSlice = createSlice({
  name: "experience",
  initialState: initialExperienceState,
  reducers: {
    setExperienceScroll: (
      state,
      action: PayloadAction<ExperienceState["scroll"]>
    ) => ({
      ...state,
      scroll: action.payload,
    }),
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
  },
});

// Actions
export const {
  setExperienceScroll,
  setExperienceSearch,
  setExperienceSort,
} = experienceSlice.actions;

// Selectors
export const getExperienceScroll = (
  state: RootState
): ExperienceState["scroll"] => state.experience.scroll;

export const getExperienceSearch = (
  state: RootState
): ExperienceState["search"] => state.experience.search;

export const getExperienceSort = (state: RootState): ExperienceState["sort"] =>
  state.experience.sort;

// Reducer
export const experienceReducer = experienceSlice.reducer;

export default experienceSlice;
