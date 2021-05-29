// React Imports
import React, { FC } from "react";
import Tag from "./Tag";
import { sortTags } from "../../Utils/tags";
import { TagFields } from "../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getTagsSearch, getTagsSort } from "../../Redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { useProjects } from "../../Context/DataContext";

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
  const search = useSelector(getTagsSearch);
  const sort = useSelector(getTagsSort);
  const projects = useProjects();

  const sortedTags = sortTags(sort, tags, projects);

  return (
    <div className={classes.container}>
      {sortedTags.map((tag) => (
        <Tag key={tag.id} {...tag} />
      ))}
    </div>
  );
};

export default Contents;
