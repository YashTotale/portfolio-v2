//React Imports
import React, { FC } from "react";
import { useProjects } from "../Context/ProjectsContext";
import { ProjectFields } from "../Utils/types";

//Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  projects: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ProjectsPage: FC = () => {
  const classes = useStyles();
  const projects = useProjects();

  console.log(projects);

  return (
    <div className={classes.projects}>
      {projects === null ? (
        <CircularProgress />
      ) : (
        Object.entries(projects).map(([id, fields]) => (
          <Project key={id} {...fields} />
        ))
      )}
    </div>
  );
};

const Project: FC<ProjectFields> = (props) => {
  return <h1>{props.title}</h1>;
};

export default ProjectsPage;
