// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import RichText from "../../RichText";
import DynamicImage from "../../DynamicImage";
import { ResolvedProject } from "../../../Utils/types";

// Material UI Imports
import { Button, makeStyles, Typography } from "@material-ui/core";
import { GitHub, Launch } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  projectInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",

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
    minWidth: "150px",
    overflow: "hidden",

    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
    },
  },
  projectLink: {
    textDecorationColor: theme.palette.text.primary,
  },
  projectLinkButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.text.primary,
    textDecoration: "inherit",
    width: "100%",
    textTransform: "none",
    padding: theme.spacing(0.5, 1.5),
    margin: theme.spacing(1, 0),
  },
}));

const Display: FC<ResolvedProject> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.projectInfo}>
      <DynamicImage
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
            <a
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.projectLink}
            >
              <Button variant="outlined" className={classes.projectLinkButton}>
                <Typography>View Website</Typography>
                <Launch fontSize="small" />
              </Button>
            </a>
          )}
          {props.github && (
            <a
              href={props.github}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.projectLink}
            >
              <Button variant="outlined" className={classes.projectLinkButton}>
                <Typography>View GitHub</Typography>
                <GitHub fontSize="small" />
              </Button>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Display;
