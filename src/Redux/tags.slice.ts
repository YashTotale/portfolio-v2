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
}

export const initialTagsState: TagsState = {
  search: "",
  sort: TAGS_SORT[0],
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
  },
});

// Actions
export const { setTagsSearch, setTagsSort } = tagsSlice.actions;

// Selectors

export const getTagsSearch = (state: RootState): TagsState["search"] =>
  state.tags.search;

export const getTagsSort = (state: RootState): TagsState["sort"] =>
  state.tags.sort;

// Reducer
export const tagsReducer = tagsSlice.reducer;

export default tagsSlice;
