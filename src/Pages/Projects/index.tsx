//React Imports
import React, { FC } from "react";
import { useProjects } from "../../Context/DataContext";
import { chunk } from "../../Utils/funcs";

//Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";
import Chunk from "./Chunk";

const useStyles = makeStyles((theme) => ({
  projects: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: theme.spacing(2),
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
        chunks.map((chunk, i) => <Chunk key={i} ids={chunk} />)
      )}
    </div>
  );
};

export default ProjectsPage;
