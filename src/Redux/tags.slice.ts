import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type TagsSort =
  | "Alphabetically"
  | "Most Related Experience"
  | "Most Related Projects"
  | "Most Related Articles";
export const TAGS_SORT: TagsSort[] = [
  "Alphabetically",
  "Most Related Experience",
  "Most Related Projects",
  "Most Related Articles",
];

export interface TagsState {
  search: string;
  sort: TagsSort;
  experienceFilter: string[];
  educationFilter: string[];
  projectFilter: string[];
  articleFilter: string[];
}

export const initialTagsState: TagsState = {
  search: "",
  sort: TAGS_SORT[0],
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
