import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface NavHistory {
  title: string;
  pathname: string;
}

export interface NavState {
  navHistory: NavHistory[];
}

export const initialNavState: NavState = {
  navHistory: [],
};

const navSlice = createSlice({
  name: "nav",
  initialState: initialNavState,
  reducers: {
    addToHistory: (
      state,
      action: PayloadAction<NavState["navHistory"][number]>
    ) => {
      const nav = action.payload;
      const exists = state.navHistory.findIndex(
        (val) => val.pathname === nav.pathname
      );

      if (exists !== -1) {
        return {
          ...state,
          navHistory: [
            ...state.navHistory.slice(0, exists),
            ...state.navHistory.slice(exists + 1),
            { ...state.navHistory[exists], ...nav },
          ],
        };
      }

      return {
        ...state,
        navHistory: [...state.navHistory, nav],
      };
    },
    modifyLastHistory: (
      state,
      action: PayloadAction<Partial<NavState["navHistory"][number]>>
    ) => ({
      ...state,
      navHistory: [
        ...state.navHistory.slice(0, -1),
        {
          ...state.navHistory[state.navHistory.length - 1],
          ...action.payload,
        },
      ],
    }),
    popHistory: (state) => ({
      ...state,
      navHistory: state.navHistory.slice(0, -1),
    }),
  },
});

// Actions
export const { addToHistory, modifyLastHistory, popHistory } = navSlice.actions;

// Selectors
export const getNavHistory = (state: RootState): NavState["navHistory"] =>
  state.nav.navHistory;

export const getLastNav = (
  state: RootState
): NavState["navHistory"][number] | undefined =>
  state.nav.navHistory[state.nav.navHistory.length - 2];

// Reducer
export const navReducer = navSlice.reducer;

export default navSlice;
