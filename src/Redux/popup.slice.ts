import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type PopupType = null;

export interface PopupState {
  open: boolean;
  type: PopupType;
}

export const initialPopupState: PopupState = {
  open: false,
  type: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState: initialPopupState,
  reducers: {},
});

// Actions
// export const {} = popupSlice.actions;

// Selectors
export const getPopupOpen = (state: RootState): PopupState["open"] =>
  state.popup.open;
export const getPopupType = (state: RootState): PopupState["type"] =>
  state.popup.type;

// Reducer
export const popupReducer = popupSlice.reducer;

export default popupSlice;
