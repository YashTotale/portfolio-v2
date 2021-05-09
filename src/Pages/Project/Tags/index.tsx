// React Imports
import React, { FC } from "react";
import Tag from "./Tag";
import { ProjectFields } from "../../../Utils/types";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

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
}));

const Tags: FC<ProjectFields> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.projectTags}>
      <Typography
        variant={isSizeSmall ? "h5" : "h4"}
        align="center"
        className={classes.heading}
      >
        Technologies Used
      </Typography>
      <div className={classes.tagsContainer}>
        {props.tags.map((tag, i) => (
          <Tag key={i} {...tag.fields} id={tag.sys.id} />
        ))}
      </div>
    </div>
  );
};

export default Tags;
