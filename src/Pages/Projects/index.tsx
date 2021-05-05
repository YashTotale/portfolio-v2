//React Imports
import React, { FC } from "react";
import Project from "./Project";
import { useProjects } from "../../Context/DataContext";
import { chunk } from "../../Utils/funcs";

//Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
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

  if (projects === null)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  const chunks = chunk(Object.keys(projects), 2);

  return (
    <Container>
      {chunks.map((ids, i) => (
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
      ))}
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default ProjectsPage;
