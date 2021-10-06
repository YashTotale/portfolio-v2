import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export const EDUCATION_SORT = ["Default", "Alphabetically", "Latest"] as const;
export type EducationSort = typeof EDUCATION_SORT[number];

export interface EducationState {
  search: string;
  sort: EducationSort;
  viewable: string[];
  tagFilter: string[];
  typeFilter: string[];
  providerFilter: string[];
}

export const initialEducationState: EducationState = {
  search: "",
  sort: EDUCATION_SORT[0],
  viewable: [],
  tagFilter: [],
  typeFilter: [],
  providerFilter: [],
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
    setEducationTypeFilter: (
      state,
      action: PayloadAction<EducationState["typeFilter"]>
    ) => ({
      ...state,
      typeFilter: action.payload,
    }),
    setEducationProviderFilter: (
      state,
      action: PayloadAction<EducationState["providerFilter"]>
    ) => ({
      ...state,
      providerFilter: action.payload,
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
  setEducationTypeFilter,
  setEducationProviderFilter,
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

export const getEducationTypeFilter = (
  state: RootState
): EducationState["typeFilter"] => state.education.typeFilter;

export const getEducationProviderFilter = (
  state: RootState
): EducationState["providerFilter"] => state.education.providerFilter;

export const getEducationViewable = (
  state: RootState
): EducationState["viewable"] => state.education.viewable;

// Reducer
export const educationReducer = educationSlice.reducer;

export default educationSlice;
