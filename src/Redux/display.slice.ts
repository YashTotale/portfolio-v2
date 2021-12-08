// External Imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import merge from "lodash.merge";

// Internal Imports
import { RootState } from "../Store";
import { UserDisplay } from "../../types/firestore";
import { DeepPartial } from "../../types/general";
import { DEFAULT_USER_DISPLAY } from "../Utils/constants";

export enum PopupState {
  FORGOT_PASSWORD = "forgot_password",
  SIGN_IN_REQUIRED = "sign_in_required",
  DELETE_ACCOUNT = "delete_account",
  CLOSED = "none",
}

export interface DisplayState {
  isSidebarOpen: boolean;
  popupState: PopupState;
  userDisplay: UserDisplay;
}

export const initialDisplayState: DisplayState = {
  isSidebarOpen: false,
  popupState: PopupState.CLOSED,
  userDisplay: DEFAULT_USER_DISPLAY,
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
    updateUserDisplay: (
      state,
      action: PayloadAction<DeepPartial<UserDisplay>>
    ) =>
      merge({}, state, {
        userDisplay: action.payload,
      }),
  },
});

// Actions
export const { toggleSidebar, changePopupState, updateUserDisplay } =
  displaySlice.actions;

// Selectors
export const getIsSidebarOpen = (
  state: RootState
): DisplayState["isSidebarOpen"] => state.display.isSidebarOpen;

export const getPopupState = (state: RootState): DisplayState["popupState"] =>
  state.display.popupState;

export const getUserDisplay = (state: RootState): DisplayState["userDisplay"] =>
  state.display.userDisplay;

// Reducer
export const displayReducer = displaySlice.reducer;

export default displaySlice;
