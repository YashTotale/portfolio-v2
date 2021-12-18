import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export const DATA_TOUR = "data-tour" as const;

export enum TourStep {
  TYPER,
}

export interface TourState {
  snackbarOpen: boolean;
}

export const initialTourState: TourState = {
  snackbarOpen: true,
};

const tourSlice = createSlice({
  name: "tour",
  initialState: initialTourState,
  reducers: {
    toggleTourSnackbarOpen: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => ({
      ...state,
      snackbarOpen: action.payload ?? !state.snackbarOpen,
    }),
  },
});

// Actions
export const { toggleTourSnackbarOpen } = tourSlice.actions;

// Selectors
export const getTourSnackbarOpen = (
  state: RootState
): TourState["snackbarOpen"] => state.tour.snackbarOpen;

// Reducer
export const tourReducer = tourSlice.reducer;

export default tourSlice;
