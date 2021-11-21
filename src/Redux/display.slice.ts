import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export enum PopupState {
  FORGOT_PASSWORD = "forgot_password",
  SIGN_IN_REQUIRED = "sign_in_required",
  CLOSED = "none",
}

export interface DisplayState {
  isSidebarOpen: boolean;
  popupState: PopupState;
}

export const initialDisplayState: DisplayState = {
  isSidebarOpen: false,
  popupState: PopupState.CLOSED,
};

const displaySlice = createSlice({
  name: "display",
  initialState: initialDisplayState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => ({
      ...state,
      isSidebarOpen: action.payload ?? !state.isSidebarOpen,
    }),
    changePopupState: (
      state,
      action: PayloadAction<DisplayState["popupState"]>
    ) => ({
      ...state,
      popupState: action.payload,
    }),
  },
});

// Actions
export const { toggleSidebar, changePopupState } = displaySlice.actions;

// Selectors
export const getIsSidebarOpen = (
  state: RootState
): DisplayState["isSidebarOpen"] => state.display.isSidebarOpen;

export const getPopupState = (state: RootState): DisplayState["popupState"] =>
  state.display.popupState;

// Reducer
export const displayReducer = displaySlice.reducer;

export default displaySlice;
