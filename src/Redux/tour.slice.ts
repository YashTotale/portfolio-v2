import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export enum TourStep {
  INTRO,
}

export interface TourState {
  open: boolean;
  snackbarOpen: boolean;
  step: TourStep;
}

export const initialTourState: TourState = {
  open: false,
  snackbarOpen: true,
  step: TourStep.INTRO,
};

const tourSlice = createSlice({
  name: "tour",
  initialState: initialTourState,
  reducers: {
    toggleTourOpen: (state, action: PayloadAction<boolean | undefined>) => ({
      ...state,
      open: action.payload ?? !state.snackbarOpen,
    }),
    toggleTourSnackbarOpen: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => ({
      ...state,
      snackbarOpen: action.payload ?? !state.snackbarOpen,
    }),
    setTourStep: (state, action: PayloadAction<TourStep>) => ({
      ...state,
      step: action.payload,
    }),
  },
});

// Actions
export const { toggleTourOpen, toggleTourSnackbarOpen, setTourStep } =
  tourSlice.actions;

// Selectors

export const getTourOpen = (state: RootState): TourState["open"] =>
  state.tour.open;

export const getTourSnackbarOpen = (
  state: RootState
): TourState["snackbarOpen"] => state.tour.snackbarOpen;

// Reducer
export const tourReducer = tourSlice.reducer;

export default tourSlice;
