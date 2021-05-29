// React Imports
import React, { FC, useCallback, useMemo } from "react";
import Tag from "./Tag";
import { sortTags } from "../../Utils/tags";
import { TagFields } from "../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getTagsSearch, getTagsSort } from "../../Redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import {
  useArticles,
  useExperience,
  useProjects,
} from "../../Context/DataContext";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
  },
}));

interface ContentsProps {
  tags: TagFields[];
}

const Contents: FC<ContentsProps> = ({ tags }) => {
  const classes = useStyles();
  const sort = useSelector(getTagsSort);
  const search = useSelector(getTagsSearch);
  const normalizedSearch = search.toLowerCase();

  const experience = useExperience();
  const projects = useProjects();
  const articles = useArticles();

  const sortedTags = sortTags(sort, tags, experience, projects, articles);

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
    if (!normalizedSearch.length) return sortedTags;

    return sortedTags.reduce((arr, tag) => {
      const matches = getTagMatch(tag);

      if (matches.some((bool) => bool)) return [...arr, tag];

      return arr;
    }, [] as TagFields[]);
  }, [sortedTags, normalizedSearch, getTagMatch]);

  return (
    <div className={classes.container}>
      {filteredTags.map((tag) => (
        <Tag key={tag.id} {...tag} />
      ))}
    </div>
  );
};

export default Contents;
