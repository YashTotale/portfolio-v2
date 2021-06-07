// React Imports
import React, { FC } from "react";
import Overlay from "../../Components/Overlay";
import { ResolvedProject } from "../../Utils/types";
import { getAsset } from "../../Utils/Content/assets";

// Material UI Imports
import { makeStyles, useTheme } from "@material-ui/core";

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
  const theme = useTheme();

  const isDark = theme.palette.type === "dark";

  return (
    <div className={classes.projectTags}>
      <div className={classes.tagsContainer}>
        {props.tags.map((tag) => (
          <Overlay
            to={`/tags/${tag.id}`}
            icon={getAsset(isDark ? tag.darkIcon : tag.lightIcon)}
            label={tag.title}
            className={classes.tag}
            key={tag.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Tags;
