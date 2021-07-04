import { FirebaseReducer } from "react-redux-firebase";
import { RootState } from "../Store";

/**
 * Firebase
 */

export const getUser = (state: RootState): FirebaseReducer.AuthState =>
  state.firebase.auth;

/**
 * Display Slice
 */

export {
  // -> Slice
  default as displaySlice,
  // -> Selectors
  getIsDarkMode,
  getIsSidebarOpen,
  getColors,
  getShades,
  getIsDefaultColors,
  // -> Actions
  toggleDarkMode,
  toggleSidebar,
  changeColor,
  changeShade,
  resetColors,
  // -> Reducer
  displayReducer,
  // -> State
  initialDisplayState,
} from "./display.slice";

export type { DisplayState } from "./display.slice";

/**
 * Popup Slice
 */

export {
  // -> Slice
  default as popupSlice,
  // -> Selectors
  getPopupOpen,
  getPopupType,
  // -> Actions
  // -> Reducer
  popupReducer,
  // -> State
  initialPopupState,
} from "./popup.slice";

export type { PopupState } from "./popup.slice";

/**
 * Experience Slice
 */

export {
  // -> Slice
  default as experienceSlice,
  // -> Selectors
  getExperienceSearch,
  getExperienceSort,
  getExperienceTagFilter,
  getExperienceProjectFilter,
  getExperienceViewable,
  // -> Actions
  setExperienceSearch,
  setExperienceSort,
  setExperienceTagFilter,
  setExperienceProjectFilter,
  addExperienceViewable,
  removeExperienceViewable,
  removeAllExperienceViewable,
  // -> Reducer
  experienceReducer,
  // -> State
  initialExperienceState,
} from "./experience.slice";

export type { ExperienceState } from "./experience.slice";

/**
 * Projects Slice
 */

export {
  // -> Slice
  default as projectsSlice,
  // -> Selectors
  getProjectsSearch,
  getProjectsSort,
  getProjectsTagFilter,
  getProjectsExperienceFilter,
  getProjectsViewable,
  // -> Actions
  setProjectsSearch,
  setProjectsSort,
  setProjectsTagFilter,
  setProjectsExperienceFilter,
  addProjectViewable,
  removeProjectViewable,
  removeAllProjectViewable,
  // -> Reducer
  projectsReducer,
  // -> State
  initialProjectsState,
} from "./projects.slice";

export type { ProjectsState } from "./projects.slice";

/**
 * Articles Slice
 */

export {
  // -> Slice
  default as articlesSlice,
  // -> Selectors
  getArticlesSearch,
  getArticlesSort,
  getArticlesTagFilter,
  getArticlesExperienceFilter,
  // -> Actions
  setArticlesSearch,
  setArticlesSort,
  setArticlesTagFilter,
  setArticlesExperienceFilter,
  // -> Reducer
  articlesReducer,
  // -> State
  initialArticlesState,
} from "./articles.slice";

export type { ArticlesState } from "./articles.slice";

/**
 * Tags Slice
 */

export {
  // -> Slice
  default as tagsSlice,
  // -> Selectors
  getTagsSearch,
  getTagsSort,
  getTagsProjectFilter,
  getTagsArticleFilter,
  getTagsExperienceFilter,
  // -> Actions
  setTagsSearch,
  setTagsSort,
  setTagsProjectFilter,
  setTagsArticleFilter,
  setTagsExperienceFilter,
  // -> Reducer
  tagsReducer,
  // -> State
  initialTagsState,
} from "./tags.slice";

export type { TagsState } from "./tags.slice";

/**
 * Books Slice
 */

export {
  // -> Slice
  default as booksSlice,
  // -> Selectors
  getBooksSearch,
  getBooksGenreFilter,
  // -> Actions
  setBooksSearch,
  setBooksGenreFilter,
  // -> Reducer
  booksReducer,
  // -> State
  initialBooksState,
} from "./books.slice";

export type { BooksState } from "./books.slice";
