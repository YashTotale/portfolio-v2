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
  togglePopup,
  setPopupType,
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
  getExperienceScroll,
  getExperienceSearch,
  getExperienceSort,
  // -> Actions
  setExperienceScroll,
  setExperienceSearch,
  setExperienceSort,
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
  // -> Actions
  setProjectsSearch,
  setProjectsSort,
  // -> Reducer
  projectsReducer,
  // -> State
  initialProjectsState,
} from "./projects.slice";

export type { ProjectsState } from "./projects.slice";
