// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import RichText from "../../../RichText";
import DynamicImage from "../../../DynamicImage";
import { ResolvedProject } from "../../../../Utils/types";

// Material UI Imports
import {
  Button,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { GitHub, Launch } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  projectInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(1),

    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
    },

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  projectImage: {
    margin: theme.spacing(2),

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
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1,
  },
  projectLinks: {
    margin: theme.spacing(1),
    minWidth: "140px",
    overflow: "hidden",

    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(0, 1),
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
  projectLinkText: {
    marginRight: theme.spacing(0.5),
  },
}));

const Display: FC<ResolvedProject> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.projectInfo}>
      <DynamicImage
        src={`${props.image.file.url}?w=225`}
        alt={props.image.title}
        className={classes.projectImage}
      />
      <div className={classes.projectDescription}>
        <RichText
          variant={isSizeSmall ? "body2" : "body1"}
          richText={props.description as Document}
        />
      </div>
      {(props.link || props.github) && isSizeSmall && (
        <div className={classes.projectLinks}>
          {props.link && (
            <a
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.projectLink}
            >
              <Button variant="outlined" className={classes.projectLinkButton}>
                <Typography variant="body2" className={classes.projectLinkText}>
                  View Website
                </Typography>
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
                <Typography variant="body2">View GitHub</Typography>
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
