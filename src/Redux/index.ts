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
  // -> Actions
  toggleDarkMode,
  toggleSidebar,
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
  // -> Actions
  setExperienceSearch,
  setExperienceSort,
  setExperienceTagFilter,
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
  // -> Actions
  setProjectsSearch,
  setProjectsSort,
  setProjectsTagFilter,
  // -> Reducer
  projectsReducer,
  // -> State
  initialProjectsState,
} from "./projects.slice";

export type { ProjectsState } from "./projects.slice";

/**
 * Projects Slice
 */

export {
  // -> Slice
  default as tagsSlice,
  // -> Selectors
  getTagsSearch,
  getTagsSort,
  // -> Actions
  setTagsSearch,
  setTagsSort,
  // -> Reducer
  tagsReducer,
  // -> State
  initialTagsState,
} from "./tags.slice";

export type { TagsState } from "./tags.slice";
