// React Imports
import React, { FC } from "react";
import { useParams } from "react-router";
import NotFound from "../NotFound";
import { useProjects } from "../../Context/DataContext";

// Material UI Imports
import { CircularProgress, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  projectDisplay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface Params {
  id: string;
}

const Project: FC = () => {
  const { id } = useParams<Params>();
  const classes = useStyles();
  const projects = useProjects();

  if (projects === null)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  const project = projects[id];

  if (!project)
    return (
      <NotFound
        name="project"
        redirect="/projects"
        redirectName="Projects Page"
      />
    );

  return (
    <Container>
      <Paper className={classes.projectDisplay}></Paper>
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Project;
