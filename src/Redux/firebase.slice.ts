import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Nullable } from "../../types/general";
import {
  WithId,
  Collections,
  Collections as CollectionName,
  Schema,
} from "../../types/firestore";
import { RootState } from "../Store";

export type ReduxDoc<Property extends Collections> = Nullable<
  WithId<Schema[Property]>
>;

export type FirebaseState = {
  firestore: {
    [Property in Collections]: Record<string, ReduxDoc<Property>>;
  };
};

export const initialFirebaseState: FirebaseState = {
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
        collection: CollectionName;
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
  },
});

// Actions
export const { setDoc } = firebaseSlice.actions;

// Selectors
export const getDoc =
  <T extends CollectionName>(collection: T, docId: string) =>
  (state: RootState): ReduxDoc<T> =>
    state.firebase.firestore[collection][docId] as ReduxDoc<T>;

// Reducer
export const firebaseReducer = firebaseSlice.reducer;

export default firebaseSlice;
