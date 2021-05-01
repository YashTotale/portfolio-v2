//React Imports
import React, { FC, useEffect, useState } from "react";

//Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";
import { getProjects, Projects } from "../API/projects";

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

  const [projects, setProjects] = useState<Projects | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const projects = await getProjects();

      if (isMounted) {
        setProjects(projects);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  console.log(projects);

  return (
    <div className={classes.projects}>
      {projects === null ? (
        <CircularProgress />
      ) : (
        Object.entries(projects).map(([id, fields]) => (
          <h1 key={id}>{fields.title}</h1>
        ))
      )}
    </div>
  );
};

export default ProjectsPage;
