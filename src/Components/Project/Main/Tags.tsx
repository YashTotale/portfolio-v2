// React Imports
import React, { FC } from "react";
import Associated from "../../Tag/Associated";
import { ResolvedProject } from "../../../Utils/types";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  projectTags: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: theme.spacing(1, 0),
  },
  heading: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  tagsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  tag: {
    margin: theme.spacing(1, 2),
  },
}));

const Tags: FC<ResolvedProject> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.projectTags}>
      <div className={classes.tagsContainer}>
        {props.tags.map((tag) => (
          <Associated key={tag.id} id={tag.id} className={classes.tag} />
        ))}
      </div>
    </div>
  );
};

export default Tags;
