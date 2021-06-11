// React Imports
import React, { FC, useCallback, useMemo } from "react";
import TagPreview from "../../Components/Tag/Preview";
import { useSortedTags } from "../../Utils/Content/tags";
import { Tag as TagFields } from "../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getTagsSearch } from "../../Redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
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
    <div className={classes.container}>
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

export default Contents;
