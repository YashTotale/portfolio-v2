import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export interface DisplayState {
  isDarkMode: boolean | null;
  isSidebarOpen: boolean;
}

export const initialDisplayState: DisplayState = {
  isDarkMode: null,
  isSidebarOpen: false,
};

const displaySlice = createSlice({
  name: "display",
  initialState: initialDisplayState,
  reducers: {
    toggleDarkMode: (state, action: PayloadAction<boolean | undefined>) => ({
      ...state,
      isDarkMode: action.payload ?? !state.isDarkMode,
    }),
    toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => ({
      ...state,
      isSidebarOpen: action.payload ?? !state.isSidebarOpen,
    }),
  },
});

// Actions
export const { toggleDarkMode, toggleSidebar } = displaySlice.actions;

// Selectors
export const getIsDarkMode = (state: RootState): DisplayState["isDarkMode"] =>
  state.display.isDarkMode;

export const getIsSidebarOpen = (
  state: RootState
): DisplayState["isSidebarOpen"] => state.display.isSidebarOpen;

// Reducer
export const displayReducer = displaySlice.reducer;

export default displaySlice;
