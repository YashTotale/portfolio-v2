// React Imports
import React, { FC, useCallback, useMemo } from "react";
import TagPreview from "../../Components/Tag/Preview";
import Filters from "../../Components/Filters";
import { Tag as TagFields } from "../../Utils/types";
import { useSortedTags } from "../../Utils/Content/tags";

// Redux Imports
import { useSelector } from "react-redux";
import { getTagsSearch, getTagsSort } from "../../Redux";
import {
  setTagsSearch,
  setTagsSort,
  TagsSort,
  TAGS_SORT,
} from "../../Redux/tags.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
    padding: theme.spacing(0, 2),
  },
  filters: {
    width: "95%",
  },
  tags: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "95%",
    marginLeft: theme.spacing(-2),
  },
  preview: {
    margin: theme.spacing(2),
  },
}));

const Tags: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const search = useSelector(getTagsSearch);
  const sort = useSelector(getTagsSort);

  return (
    <div className={classes.container}>
      <Filters
        search={{
          defaultSearch: search,
          onSearchChange: (value) => dispatch(setTagsSearch(value)),
        }}
        sort={{
          value: sort,
          values: TAGS_SORT,
          onChange: (value) => dispatch(setTagsSort(value as TagsSort)),
        }}
        className={classes.filters}
      />
      <Contents />
    </div>
  );
};

const Contents: FC = () => {
  const classes = useStyles();
  const tags = useSortedTags();

  const search = useSelector(getTagsSearch);
  const normalizedSearch = search.toLowerCase();

  const getTagMatch = useCallback(
    (t: TagFields) => {
      const matches: boolean[] = [
        t.title.toLowerCase().includes(normalizedSearch),
      ];

      return matches;
    },
    [normalizedSearch]
  );

  const filteredTags = useMemo(() => {
    if (!normalizedSearch.length) return tags;

    return tags.reduce((arr, tag) => {
      const matches = getTagMatch(tag);

      if (matches.some((bool) => bool)) return [...arr, tag];

      return arr;
    }, [] as TagFields[]);
  }, [tags, normalizedSearch, getTagMatch]);

  return (
    <div className={classes.tags}>
      {filteredTags.map((tag) => (
        <TagPreview
          key={tag.id}
          id={tag.id}
          search={search}
          className={classes.preview}
        />
      ))}
    </div>
  );
};

export default Tags;
