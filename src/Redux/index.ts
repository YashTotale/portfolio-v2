/**
 * Display Slice
 */

export {
  // -> Slice
  default as displaySlice,
  // -> Selectors
  getIsSidebarOpen,
  getPopupType,
  getPopupState,
  getUserDisplay,
  // -> Actions
  toggleSidebar,
  changePopupState,
  updateUserDisplay,
  // -> Reducer
  displayReducer,
  // -> State
  initialDisplayState,
} from "./display.slice";

export type { DisplayState } from "./display.slice";

/**
 * Nav Slice
 */

export {
  // -> Slice
  default as navSlice,
  // -> Selectors
  getNavHistory,
  getLastNav,
  // -> Actions
  addToHistory,
  modifyLastHistory,
  popHistory,
  // -> Reducer
  navReducer,
  // -> State
  initialNavState,
} from "./nav.slice";

export type { NavState } from "./nav.slice";

/**
 * Tour Slice
 */

export {
  // -> Slice
  default as tourSlice,
  // -> Selectors
  getTourSnackbarOpen,
  // -> Actions
  toggleTourSnackbarOpen,
  // -> Reducer
  tourReducer,
  // -> State
  initialTourState,
} from "./tour.slice";

export type { TourState } from "./tour.slice";

/**
 * Experience Slice
 */

export {
  // -> Slice
  default as experienceSlice,
  // -> Selectors
  getExperienceSearch,
  getExperienceSort,
  getExperienceTypeFilter,
  getExperienceTagFilter,
  getExperienceProjectFilter,
  getExperienceViewable,
  // -> Actions
  setExperienceSearch,
  setExperienceSort,
  setExperienceTypeFilter,
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
 * Education Slice
 */

export {
  // -> Slice
  default as educationSlice,
  // -> Selectors
  getEducationSearch,
  getEducationSort,
  getEducationTagFilter,
  getEducationTypeFilter,
  getEducationProviderFilter,
  getEducationViewable,
  // -> Actions
  setEducationSearch,
  setEducationSort,
  setEducationTagFilter,
  setEducationTypeFilter,
  setEducationProviderFilter,
  addEducationViewable,
  removeEducationViewable,
  removeAllEducationViewable,
  // -> Reducer
  educationReducer,
  // -> State
  initialEducationState,
} from "./education.slice";

export type { EducationState } from "./education.slice";

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
  getArticlesViewable,
  // -> Actions
  setArticlesSearch,
  setArticlesSort,
  setArticlesTagFilter,
  setArticlesExperienceFilter,
  addArticleViewable,
  removeArticleViewable,
  removeAllArticleViewable,
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
  getTagsCategoryFilter,
  getTagsExperienceFilter,
  getTagsEducationFilter,
  getTagsProjectFilter,
  getTagsArticleFilter,
  // -> Actions
  setTagsSearch,
  setTagsSort,
  setTagsCategoryFilter,
  setTagsExperienceFilter,
  setTagsEducationFilter,
  setTagsProjectFilter,
  setTagsArticleFilter,
  // -> Reducer
  tagsReducer,
  // -> State
  initialTagsState,
} from "./tags.slice";

export type { TagsState } from "./tags.slice";

/**
 * Certification Slice
 */

export {
  // -> Slice
  default as certificationSlice,
  // -> Selectors
  getCertificationSearch,
  getCertificationSort,
  getCertificationTagFilter,
  getCertificationProviderFilter,
  // -> Actions
  setCertificationSearch,
  setCertificationSort,
  setCertificationTagFilter,
  setCertificationProviderFilter,
  // -> Reducer
  certificationReducer,
  // -> State
  initialCertificationState,
} from "./certification.slice";

export type { CertificationState } from "./certification.slice";

/**
 * Books Slice
 */

export {
  // -> Slice
  default as booksSlice,
  // -> Selectors
  getBooksSearch,
  getBooksSort,
  getBooksGenreFilter,
  getBooksAuthorFilter,
  getBooksCenturyFilter,
  getBooksYearFilter,
  // -> Actions
  setBooksSearch,
  setBooksSort,
  setBooksGenreFilter,
  setBooksAuthorFilter,
  setBooksCenturyFilter,
  setBooksYearFilter,
  // -> Reducer
  booksReducer,
  // -> State
  initialBooksState,
} from "./books.slice";

export type { BooksState } from "./books.slice";
