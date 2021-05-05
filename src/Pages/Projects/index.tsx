//React Imports
import React, { FC } from "react";
import Project from "./Project";
import { useProjects } from "../../Context/DataContext";
import { chunk } from "../../Utils/funcs";

//Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  projects: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  projectChunk: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    margin: theme.spacing(2),
    width: "100%",
  },
}));

const ProjectsPage: FC = () => {
  const classes = useStyles();
  const projects = useProjects();

  const chunks = projects === null ? null : chunk(Object.keys(projects), 2);

  return (
    <div className={classes.projects}>
      {chunks === null ? (
        <CircularProgress />
      ) : (
        chunks.map((ids, i) => (
          <div key={i} className={classes.projectChunk}>
            {ids.map((id) => (
              <Project
                key={id}
                id={id}
                isSingle={ids.length === 1}
                {...projects![id]}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectsPage;
