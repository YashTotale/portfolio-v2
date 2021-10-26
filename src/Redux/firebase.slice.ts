import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collection as CollectionName } from "../Controllers/helpers/firestore";
import { RootState } from "../Store";

type Collection = Record<string, any>;

export type FirebaseState = {
  firestore: Record<CollectionName, Collection>;
};

export const initialFirebaseState: FirebaseState = {
  firestore: {
    users: {},
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
        data: any;
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
  <T>(collection: CollectionName, docId: string) =>
  (state: RootState): T =>
    state.firebase.firestore[collection][docId];

// Reducer
export const firebaseReducer = firebaseSlice.reducer;

export default firebaseSlice;
