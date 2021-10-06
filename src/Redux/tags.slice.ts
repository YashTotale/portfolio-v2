import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export const TAGS_SORT = [
  "Alphabetically",
  "Most Related Experience",
  "Most Related Education",
  "Most Related Projects",
  "Most Related Articles",
  "Most Related Certifications",
] as const;
export type TagsSort = typeof TAGS_SORT[number];

export interface TagsState {
  search: string;
  sort: TagsSort;
  categoryFilter: string[];
  experienceFilter: string[];
  educationFilter: string[];
  projectFilter: string[];
  articleFilter: string[];
}

export const initialTagsState: TagsState = {
  search: "",
  sort: TAGS_SORT[0],
  categoryFilter: [],
  experienceFilter: [],
  educationFilter: [],
  projectFilter: [],
  articleFilter: [],
};

const tagsSlice = createSlice({
  name: "tags",
  initialState: initialTagsState,
  reducers: {
    setTagsSearch: (state, action: PayloadAction<TagsState["search"]>) => ({
      ...state,
      search: action.payload,
    }),
    setTagsSort: (state, action: PayloadAction<TagsSort>) => ({
      ...state,
      sort: action.payload,
    }),
    setTagsCategoryFilter: (
      state,
      action: PayloadAction<TagsState["categoryFilter"]>
    ) => ({
      ...state,
      categoryFilter: action.payload,
    }),
    setTagsExperienceFilter: (
      state,
      action: PayloadAction<TagsState["experienceFilter"]>
    ) => ({
      ...state,
      experienceFilter: action.payload,
    }),
    setTagsEducationFilter: (
      state,
      action: PayloadAction<TagsState["educationFilter"]>
    ) => ({
      ...state,
      educationFilter: action.payload,
    }),
    setTagsProjectFilter: (
      state,
      action: PayloadAction<TagsState["projectFilter"]>
    ) => ({
      ...state,
      projectFilter: action.payload,
    }),
    setTagsArticleFilter: (
      state,
      action: PayloadAction<TagsState["articleFilter"]>
    ) => ({
      ...state,
      articleFilter: action.payload,
    }),
  },
});

// Actions
export const {
  setTagsSearch,
  setTagsSort,
  setTagsCategoryFilter,
  setTagsExperienceFilter,
  setTagsEducationFilter,
  setTagsProjectFilter,
  setTagsArticleFilter,
} = tagsSlice.actions;

// Selectors

export const getTagsSearch = (state: RootState): TagsState["search"] =>
  state.tags.search;

export const getTagsSort = (state: RootState): TagsState["sort"] =>
  state.tags.sort;

export const getTagsCategoryFilter = (
  state: RootState
): TagsState["categoryFilter"] => state.tags.categoryFilter;

export const getTagsExperienceFilter = (
  state: RootState
): TagsState["experienceFilter"] => state.tags.experienceFilter;

export const getTagsEducationFilter = (
  state: RootState
): TagsState["educationFilter"] => state.tags.educationFilter;

export const getTagsProjectFilter = (
  state: RootState
): TagsState["projectFilter"] => state.tags.projectFilter;

export const getTagsArticleFilter = (
  state: RootState
): TagsState["articleFilter"] => state.tags.articleFilter;

// Reducer
export const tagsReducer = tagsSlice.reducer;

export default tagsSlice;
