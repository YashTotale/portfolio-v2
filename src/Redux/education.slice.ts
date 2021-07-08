import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type EducationSort =
  | "Default"
  | "Alphabetically"
  | "Latest"
  | "Earliest";
export const EDUCATION_SORT: EducationSort[] = [
  "Default",
  "Alphabetically",
  "Latest",
  "Earliest",
];

export interface EducationState {
  search: string;
  sort: EducationSort;
  viewable: string[];
  tagFilter: string[];
}

export const initialEducationState: EducationState = {
  search: "",
  sort: EDUCATION_SORT[0],
  viewable: [],
  tagFilter: [],
};

const educationSlice = createSlice({
  name: "education",
  initialState: initialEducationState,
  reducers: {
    setEducationSearch: (
      state,
      action: PayloadAction<EducationState["search"]>
    ) => ({
      ...state,
      search: action.payload,
    }),
    setEducationSort: (state, action: PayloadAction<EducationSort>) => ({
      ...state,
      sort: action.payload,
    }),
    setEducationTagFilter: (
      state,
      action: PayloadAction<EducationState["tagFilter"]>
    ) => ({
      ...state,
      tagFilter: action.payload,
    }),
    addEducationViewable: (state, action: PayloadAction<string>) => ({
      ...state,
      viewable: [...state.viewable, action.payload],
    }),
    removeEducationViewable: (state, action: PayloadAction<string>) => ({
      ...state,
      viewable: state.viewable.filter((v) => v !== action.payload),
    }),
    removeAllEducationViewable: (state) => ({
      ...state,
      viewable: [],
    }),
  },
});

// Actions
export const {
  setEducationSearch,
  setEducationSort,
  setEducationTagFilter,
  addEducationViewable,
  removeEducationViewable,
  removeAllEducationViewable,
} = educationSlice.actions;

// Selectors
export const getEducationSearch = (
  state: RootState
): EducationState["search"] => state.education.search;

export const getEducationSort = (state: RootState): EducationState["sort"] =>
  state.education.sort;

export const getEducationTagFilter = (
  state: RootState
): EducationState["tagFilter"] => state.education.tagFilter;

export const getEducationViewable = (
  state: RootState
): EducationState["viewable"] => state.education.viewable;

// Reducer
export const educationReducer = educationSlice.reducer;

export default educationSlice;
