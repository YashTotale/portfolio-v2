// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import Display from "./Display";
import Title from "./Components/Title";
import Badge from "../../Badge";
import Associated from "../../Experience/Associated";
import MainContainer from "../../Shared/MainContainer";
import TagOverlay from "../../Tag/Overlay";
import {
  generateProjectTimeline,
  getProject,
} from "../../../../Utils/Content/projects";

// Material UI Imports
import { makeStyles, Typography, Paper } from "@material-ui/core";

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
  associated: {
    margin: theme.spacing(2, 0),
    width: "100%",
  },
  tag: {
    margin: theme.spacing(1, 2),
  },
}));

interface MainProps {
  id: string;
  className?: string;
}

const Main: FC<MainProps> = (props) => {
  const classes = useStyles();
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
          <MainContainer title="Associated With" direction="column">
            <Associated
              id={project.associated.id}
              className={classes.associated}
            />
          </MainContainer>
        )}
        <MainContainer title="Related Tags">
          {project.tags.map((tag) => (
            <TagOverlay key={tag.id} id={tag.id} className={classes.tag} />
          ))}
        </MainContainer>
      </div>
    </Paper>
  );
};

export default Main;
