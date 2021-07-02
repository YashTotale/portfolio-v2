import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type Scheme = "primary" | "secondary";

export const SCHEMES: Scheme[] = ["primary", "secondary"];

export type Color =
  | "red"
  | "pink"
  | "purple"
  | "deepPurple"
  | "indigo"
  | "blue"
  | "lightBlue"
  | "cyan"
  | "teal"
  | "green"
  | "lightGreen"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "deepOrange";

export const COLORS: Color[] = [
  "red",
  "pink",
  "purple",
  "deepPurple",
  "indigo",
  "blue",
  "lightBlue",
  "cyan",
  "teal",
  "green",
  "lightGreen",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deepOrange",
];

export type Shade =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "A100"
  | "A200"
  | "A400"
  | "A700";

export const SHADES: Shade[] = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "A100",
  "A200",
  "A400",
  "A700",
];

export interface DisplayState {
  isDarkMode: boolean | null;
  isSidebarOpen: boolean;
  colors: Record<Scheme, Color>;
  shades: Record<Scheme, Shade>;
}

export const initialDisplayState: DisplayState = {
  isDarkMode: null,
  isSidebarOpen: false,
  colors: {
    primary: "lightBlue",
    secondary: "amber",
  },
  shades: {
    primary: "500",
    secondary: "700",
  },
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
    changeColor: (
      state,
      action: PayloadAction<Partial<DisplayState["colors"]>>
    ) => ({
      ...state,
      colors: {
        ...state.colors,
        ...action.payload,
      },
    }),
    changeShade: (
      state,
      action: PayloadAction<Partial<DisplayState["shades"]>>
    ) => ({
      ...state,
      shades: {
        ...state.shades,
        ...action.payload,
      },
    }),
    resetColors: (state) => ({
      ...state,
      colors: initialDisplayState.colors,
      shades: initialDisplayState.shades,
    }),
  },
});

// Actions
export const {
  toggleDarkMode,
  toggleSidebar,
  changeColor,
  changeShade,
  resetColors,
} = displaySlice.actions;

// Selectors
export const getIsDarkMode = (state: RootState): DisplayState["isDarkMode"] =>
  state.display.isDarkMode;

export const getIsSidebarOpen = (
  state: RootState
): DisplayState["isSidebarOpen"] => state.display.isSidebarOpen;

export const getColors = (state: RootState): DisplayState["colors"] =>
  state.display.colors;

export const getShades = (state: RootState): DisplayState["shades"] =>
  state.display.shades;

export const getIsDefaultColors = (state: RootState): boolean => {
  const colors = getColors(state);
  const shades = getShades(state);

  const sameColors = SCHEMES.every(
    (scheme) => initialDisplayState.colors[scheme] === colors[scheme]
  );
  const sameShades = SCHEMES.every(
    (scheme) => initialDisplayState.shades[scheme] === shades[scheme]
  );

  return sameColors && sameShades;
};

// Reducer
export const displayReducer = displaySlice.reducer;

export default displaySlice;
