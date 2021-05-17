// React Imports
import React, { FC } from "react";
import Overlay from "../../Components/Overlay";
import { ProjectFields } from "../../Utils/types";

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

  const isDark = theme.palette.type === "dark";

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
        {props.tags.map((tag) => (
          <Overlay
            to={`/tags/${tag.sys.id}`}
            icon={isDark ? tag.fields.darkIcon : tag.fields.lightIcon}
            label={tag.fields.title}
            key={tag.sys.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Tags;
