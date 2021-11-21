// External Imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import merge from "lodash.merge";

// Internal Imports
import { DEFAULT_USER_DISPLAY } from "../Utils/constants";
import { RootState } from "../Store";
import {
  WithId,
  Collections,
  Schema,
  UserDisplay,
} from "../../types/firestore";
import { Nullable } from "../../types/general";

export type ReduxDoc<Property extends Collections> = Nullable<
  WithId<Schema[Property]>
>;

export interface FirestoreDefaults {
  users: {
    display: UserDisplay;
  };
}

export type FirebaseState = {
  firestore_defaults: FirestoreDefaults;
  firestore: {
    [Property in Collections]: Record<string, ReduxDoc<Property>>;
  };
};

export const initialFirebaseState: FirebaseState = {
  firestore_defaults: {
    users: {
      display: DEFAULT_USER_DISPLAY,
    },
  },
  firestore: {
    users: {},
    users_immutable: {},
    books: {},
  },
};

const firebaseSlice = createSlice({
  name: "firebase",
  initialState: initialFirebaseState,
  reducers: {
    setDoc: (
      state,
      action: PayloadAction<{
        collection: Collections;
        docId: string;
        data: ReduxDoc<any>;
      }>
    ) => ({
      ...state,
      firestore: {
        ...state.firestore,
        [action.payload.collection]: {
          ...state.firestore[action.payload.collection],
          [action.payload.docId]: action.payload.data,
        },
      },
    }),
    updateDoc: (
      state,
      action: PayloadAction<{
        collection: Collections;
        docId: string;
        data: ReduxDoc<any>;
      }>
    ) =>
      merge({}, state, {
        firestore: {
          [action.payload.collection]: {
            [action.payload.docId]: action.payload.data,
          },
        },
      }),
    updateDefaultDoc: (
      state,
      action: PayloadAction<{
        collection: keyof FirestoreDefaults;
        data: FirestoreDefaults[keyof FirestoreDefaults];
      }>
    ) =>
      merge({}, state, {
        firestore_defaults: {
          [action.payload.collection]: action.payload.data,
        },
      }),
  },
});

// Actions
export const { setDoc, updateDoc, updateDefaultDoc } = firebaseSlice.actions;

// Selectors
export const getDoc =
  <T extends Collections>(collection: T, docId: string) =>
  (state: RootState): ReduxDoc<T> =>
    state.firebase.firestore[collection][docId] as ReduxDoc<T>;

export const getDefaultDoc =
  <T extends keyof FirestoreDefaults>(collection: T) =>
  (state: RootState): FirestoreDefaults[T] =>
    state.firebase.firestore_defaults[collection];

// Reducer
export const firebaseReducer = firebaseSlice.reducer;

export default firebaseSlice;
