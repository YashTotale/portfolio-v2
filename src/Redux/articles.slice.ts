import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type ArticlesSort = "Default" | "Alphabetically" | "Newest" | "Oldest";
export const ARTICLES_SORT: ArticlesSort[] = [
  "Default",
  "Alphabetically",
  "Newest",
  "Oldest",
];

export interface ArticlesState {
  search: string;
  sort: ArticlesSort;
  tagFilter: string[];
  experienceFilter: string[];
}

export const initialArticlesState: ArticlesState = {
  search: "",
  sort: ARTICLES_SORT[0],
  tagFilter: [],
  experienceFilter: [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState: initialArticlesState,
  reducers: {
    setArticlesSearch: (
      state,
      action: PayloadAction<ArticlesState["search"]>
    ) => ({
      ...state,
      search: action.payload,
    }),
    setArticlesSort: (state, action: PayloadAction<ArticlesState["sort"]>) => ({
      ...state,
      sort: action.payload,
    }),
    setArticlesTagFilter: (
      state,
      action: PayloadAction<ArticlesState["tagFilter"]>
    ) => ({
      ...state,
      tagFilter: action.payload,
    }),
    setArticlesExperienceFilter: (
      state,
      action: PayloadAction<ArticlesState["experienceFilter"]>
    ) => ({
      ...state,
      experienceFilter: action.payload,
    }),
  },
});

// Actions
export const {
  setArticlesSearch,
  setArticlesSort,
  setArticlesTagFilter,
  setArticlesExperienceFilter,
} = articlesSlice.actions;

// Selectors

export const getArticlesSearch = (state: RootState): ArticlesState["search"] =>
  state.articles.search;

export const getArticlesSort = (state: RootState): ArticlesState["sort"] =>
  state.articles.sort;

export const getArticlesTagFilter = (
  state: RootState
): ArticlesState["tagFilter"] => state.articles.tagFilter;

export const getArticlesExperienceFilter = (
  state: RootState
): ArticlesState["experienceFilter"] => state.articles.experienceFilter;

// Reducer
export const articlesReducer = articlesSlice.reducer;

export default articlesSlice;
