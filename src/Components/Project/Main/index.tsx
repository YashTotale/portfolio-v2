// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import Display from "./Display";
import Tags from "./Tags";
import Title from "./Components/Title";
import Badge from "../../Badge";
import Associated from "../../Experience/Associated";
import {
  generateProjectTimeline,
  getProject,
} from "../../../Utils/Content/projects";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  darken,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    padding: theme.spacing(1, 0),
    width: "100%",
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  heading: {
    margin: theme.spacing(0, 1),
  },
  badges: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  badge: {
    margin: theme.spacing(1, 0.5),
    marginBottom: 0,

    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(0, 0.5),
    },
  },
  main: {
    padding: theme.spacing(0, 2),
  },
  associatedContainer: {
    borderRadius: "4px",
    border: `1px solid ${theme.palette.text.disabled}`,
    backgroundColor:
      theme.palette.type === "dark"
        ? darken(theme.palette.grey[800], 0.3)
        : theme.palette.grey[200],
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
  },
  associated: {
    margin: theme.spacing(1, 2),
  },
  tagsContainer: {
    borderRadius: "4px",
    border: `1px solid ${theme.palette.text.disabled}`,
    backgroundColor:
      theme.palette.type === "dark"
        ? darken(theme.palette.grey[800], 0.3)
        : theme.palette.grey[200],
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
  },
}));

interface MainProps {
  id: string;
  className?: string;
}

const Main: FC<MainProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const project = getProject(props.id);

  if (!project) return null;

  return (
    <Paper elevation={8} className={clsx(classes.project, props.className)}>
      <Title {...project} />
      <Typography align="center" variant="subtitle1">
        {generateProjectTimeline(project)}
      </Typography>
      {project.badges && (
        <>
          <div className={classes.badges}>
            {project.badges.map((badge) => (
              <Badge {...badge} key={badge.id} className={classes.badge} />
            ))}
          </div>
        </>
      )}
      <div className={classes.main}>
        <Display {...project} />
        {project.associated && (
          <div className={classes.associatedContainer}>
            <Typography
              variant={isSizeSmall ? "h5" : "h4"}
              align="center"
              className={classes.heading}
            >
              Associated With
            </Typography>
            <Associated
              id={project.associated.id}
              className={classes.associated}
            />
          </div>
        )}
        <div className={classes.tagsContainer}>
          <Typography
            variant={isSizeSmall ? "h5" : "h4"}
            align="center"
            className={classes.heading}
          >
            Related Tags
          </Typography>
          <Tags {...project} />
        </div>
      </div>
    </Paper>
  );
};

export default Main;
