import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export const CERTIFICATION_SORT = ["Newest", "Alphabetically"] as const;
export type CertificationSort = typeof CERTIFICATION_SORT[number];

export interface CertificationState {
  search: string;
  sort: CertificationSort;
  providerFilter: string | null;
  tagFilter: string[];
}

export const initialCertificationState: CertificationState = {
  search: "",
  sort: CERTIFICATION_SORT[0],
  providerFilter: null,
  tagFilter: [],
};

const certificationSlice = createSlice({
  name: "certification",
  initialState: initialCertificationState,
  reducers: {
    setCertificationSearch: (
      state,
      action: PayloadAction<CertificationState["search"]>
    ) => ({
      ...state,
      search: action.payload,
    }),
    setCertificationSort: (
      state,
      action: PayloadAction<CertificationSort>
    ) => ({
      ...state,
      sort: action.payload,
    }),
    setCertificationTagFilter: (
      state,
      action: PayloadAction<CertificationState["tagFilter"]>
    ) => ({
      ...state,
      tagFilter: action.payload,
    }),
    setCertificationProviderFilter: (
      state,
      action: PayloadAction<CertificationState["providerFilter"]>
    ) => ({
      ...state,
      providerFilter: action.payload,
    }),
  },
});

// Actions
export const {
  setCertificationSearch,
  setCertificationSort,
  setCertificationTagFilter,
  setCertificationProviderFilter,
} = certificationSlice.actions;

// Selectors
export const getCertificationSearch = (
  state: RootState
): CertificationState["search"] => state.certification.search;

export const getCertificationSort = (
  state: RootState
): CertificationState["sort"] => state.certification.sort;

export const getCertificationTagFilter = (
  state: RootState
): CertificationState["tagFilter"] => state.certification.tagFilter;

export const getCertificationProviderFilter = (
  state: RootState
): CertificationState["providerFilter"] => state.certification.providerFilter;

// Reducer
export const certificationReducer = certificationSlice.reducer;

export default certificationSlice;
