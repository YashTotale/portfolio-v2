// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import { ProjectFields } from "../../Utils/types";
import Info from "../../Components/Info";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { getImageTitle, getImageUrl } from "../../API/helpers";

const useStyles = makeStyles((theme) => ({
  projectInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(2, 0),

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  projectImage: {
    marginLeft: theme.spacing(1),

    [theme.breakpoints.only("xl")]: {
      width: 225,
    },

    [theme.breakpoints.only("lg")]: {
      width: 200,
    },

    [theme.breakpoints.only("md")]: {
      width: 175,
    },

    [theme.breakpoints.only("sm")]: {
      width: 150,
    },

    [theme.breakpoints.only("xs")]: {
      width: 125,
    },
  },
  projectDescription: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
}));

const Display: FC<ProjectFields> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.projectInfo}>
      <img
        src={getImageUrl(props.image)}
        alt={getImageTitle(props.image)}
        className={classes.projectImage}
      />
      <div className={classes.projectDescription}>
        <Info richText={props.description as Document} />
      </div>
    </div>
  );
};

export default Display;
