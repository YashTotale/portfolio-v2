import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export const ARTICLES_SORT = ["Default", "Alphabetically", "Newest"] as const;
export type ArticlesSort = typeof ARTICLES_SORT[number];

export interface ArticlesState {
  search: string;
  sort: ArticlesSort;
  viewable: string[];
  experienceFilter: string | null;
  tagFilter: string[];
}

export const initialArticlesState: ArticlesState = {
  search: "",
  sort: ARTICLES_SORT[0],
  viewable: [],
  experienceFilter: null,
  tagFilter: [],
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
    addArticleViewable: (state, action: PayloadAction<string>) => ({
      ...state,
      viewable: [...state.viewable, action.payload],
    }),
    removeArticleViewable: (state, action: PayloadAction<string>) => ({
      ...state,
      viewable: state.viewable.filter((v) => v !== action.payload),
    }),
    removeAllArticleViewable: (state) => ({
      ...state,
      viewable: [],
    }),
  },
});

// Actions
export const {
  setArticlesSearch,
  setArticlesSort,
  setArticlesTagFilter,
  setArticlesExperienceFilter,
  addArticleViewable,
  removeArticleViewable,
  removeAllArticleViewable,
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

export const getArticlesViewable = (
  state: RootState
): ArticlesState["viewable"] => state.articles.viewable;

// Reducer
export const articlesReducer = articlesSlice.reducer;

export default articlesSlice;
