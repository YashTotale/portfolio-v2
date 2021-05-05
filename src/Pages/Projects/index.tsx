//React Imports
import React, { FC, useState } from "react";
import Filters from "./Filters";
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
    justifyContent: "stretch",
    padding: theme.spacing(0, 2),
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
  const [filteredProjects, setFilteredProjects] = useState(projects || {});

  if (projects === null)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  if (
    Object.keys(filteredProjects).length === 0 &&
    Object.keys(projects).length > 0
  )
    setFilteredProjects(projects);

  const chunks = chunk(Object.keys(filteredProjects), 2);

  return (
    <Container>
      <Filters
        projects={projects}
        setProjects={(filtered) =>
          setFilteredProjects(filtered === null ? projects : filtered)
        }
      />
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
