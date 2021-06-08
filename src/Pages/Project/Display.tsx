// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import RichText from "../../Components/RichText";
import HorizontalDivider from "../../Components/Divider/Horizontal";
import { ResolvedProject } from "../../Utils/types";

// Material UI Imports
import {
  darken,
  lighten,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import { GitHub, Launch } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  projectInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: theme.spacing(2),

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
    marginRight: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  projectLinks: {
    margin: theme.spacing(1),
    marginLeft: "auto",
    borderRadius: "10px",
    border: `2px solid ${
      theme.palette.common[theme.palette.type === "dark" ? "white" : "black"]
    }`,
    minWidth: "150px",
    overflow: "hidden",

    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
    },
  },
  projectLink: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    textDecoration: "inherit",
    transition: theme.transitions.create("background-color", {
      duration: "0.3s",
    }),
    "&:hover": {
      backgroundColor: (theme.palette.type === "dark" ? lighten : darken)(
        theme.palette.background.paper,
        0.2
      ),
    },
  },
}));

const Display: FC<ResolvedProject> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.projectInfo}>
      <img
        src={`${props.image.file.url}?w=225`}
        alt={props.image.title}
        className={classes.projectImage}
      />
      <div className={classes.projectDescription}>
        <RichText richText={props.description as Document} />
      </div>
      {(props.link || props.github) && (
        <div className={classes.projectLinks}>
          {props.link && (
            <a href={props.link} target="_blank" rel="noopener noreferrer">
              <div className={classes.projectLink}>
                <Typography>View Website</Typography>
                <Launch fontSize="small" />
              </div>
            </a>
          )}
          {props.link && props.github && (
            <HorizontalDivider color={theme.palette.text.primary} />
          )}
          {props.github && (
            <a href={props.github} target="_blank" rel="noopener noreferrer">
              <div className={classes.projectLink}>
                <Typography>View GitHub</Typography>
                <GitHub fontSize="small" />
              </div>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Display;
