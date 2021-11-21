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

// Redux Persist Imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import storage from "redux-persist/lib/storage";

// Reducer Imports
import { displayReducer, DisplayState } from "./Redux/display.slice";
import { firebaseReducer, FirebaseState } from "./Redux/firebase.slice";
import { navReducer, NavState } from "./Redux/nav.slice";
import { experienceReducer, ExperienceState } from "./Redux/experience.slice";
import { educationReducer, EducationState } from "./Redux/education.slice";
import { projectsReducer, ProjectsState } from "./Redux/projects.slice";
import { articlesReducer, ArticlesState } from "./Redux/articles.slice";
import { tagsReducer, TagsState } from "./Redux/tags.slice";
import {
  certificationReducer,
  CertificationState,
} from "./Redux/certification.slice";
import { booksReducer, BooksState } from "./Redux/books.slice";

interface State {
  display: DisplayState;
  firebase: FirebaseState;
  nav: NavState;
  experience: ExperienceState;
  education: EducationState;
  projects: ProjectsState;
  articles: ArticlesState;
  tags: TagsState;
  certification: CertificationState;
  books: BooksState;
}

const reducers = combineReducers<State>({
  display: displayReducer,
  firebase: firebaseReducer,
  nav: navReducer,
  experience: experienceReducer,
  education: educationReducer,
  projects: projectsReducer,
  articles: articlesReducer,
  tags: tagsReducer,
  certification: certificationReducer,
  books: booksReducer,
});

const persistedReducer = persistReducer<State>(
  {
    version: 1,
    storage,
    key: "root",
    whitelist: ["firebase"],
  },
  reducers
);

const extraArgument = {};

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    thunk: {
      extraArgument,
    },
  }),
  devTools: process.env.NODE_ENV !== "production",
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
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxStore;
