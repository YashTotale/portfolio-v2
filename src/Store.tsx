// React Imports
import React, { FC } from "react";

// Redux Imports
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";

// Firebase Imports
import firebase from "./Utils/Config/firebase";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
  firebaseReducer,
  ReactReduxFirebaseProvider,
  FirebaseReducer,
  FirestoreReducer,
} from "react-redux-firebase";
import {
  getFirestore,
  constants as rfConstants,
  createFirestoreInstance,
  firestoreReducer,
} from "redux-firestore";

// Redux Persist Imports
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import storage from "redux-persist/lib/storage";

// Reducer Imports
import { displayReducer, DisplayState } from "./Redux/display.slice";
import { navReducer, NavState } from "./Redux/nav.slice";
import { popupReducer, PopupState } from "./Redux/popup.slice";
import { experienceReducer, ExperienceState } from "./Redux/experience.slice";
import { educationReducer, EducationState } from "./Redux/education.slice";
import { projectsReducer, ProjectsState } from "./Redux/projects.slice";
import { articlesReducer, ArticlesState } from "./Redux/articles.slice";
import { tagsReducer, TagsState } from "./Redux/tags.slice";
import { booksReducer, BooksState } from "./Redux/books.slice";

interface State {
  display: DisplayState;
  nav: NavState;
  popup: PopupState;
  experience: ExperienceState;
  education: EducationState;
  projects: ProjectsState;
  articles: ArticlesState;
  tags: TagsState;
  books: BooksState;
  firebase: FirebaseReducer.Reducer<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  firestore: FirestoreReducer.Reducer;
}

const reducers = combineReducers<State>({
  display: displayReducer,
  nav: navReducer,
  popup: popupReducer,
  experience: experienceReducer,
  education: educationReducer,
  projects: projectsReducer,
  articles: articlesReducer,
  tags: tagsReducer,
  books: booksReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const persistedReducer = persistReducer<State>(
  {
    version: 1,
    storage,
    key: "root",
    whitelist: ["display"],
  },
  reducers
);

const extraArgument = {
  getFirebase,
  getFirestore,
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        ...Object.keys(rfConstants.actionTypes).map(
          (type) => `${rfConstants.actionsPrefix}/${type}`
        ),
        ...Object.keys(rrfActionTypes).map(
          (type) => `@@reactReduxFirebase/${type}`
        ),
      ],
      ignoredPaths: ["firebase", "firestore"],
    },
    thunk: {
      extraArgument,
    },
  }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export type AppThunk = ThunkAction<
  void,
  RootState,
  typeof extraArgument,
  Action<string>
>;

export const getState = store.getState;

const persistor = persistStore(store);

const ReduxStore: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        dispatch={store.dispatch}
        firebase={firebase}
        config={{
          useFirestoreForProfile: true,
          userProfile: "users",
        }}
        createFirestoreInstance={createFirestoreInstance}
      >
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          {children}
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default ReduxStore;
