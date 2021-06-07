// React Imports
import React, { FC, useCallback, useMemo } from "react";
import Tag from "../../Components/Tag/Main";
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
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
        t.link?.toLowerCase().includes(normalizedSearch) ?? false,
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
        <Tag key={tag.id} {...tag} withSearch={true} />
      ))}
    </div>
  );
};

export default Contents;
