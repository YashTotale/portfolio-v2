// React Imports
import React, { FC } from "react";
import Project from "./Project";
import { useProjects } from "../../Context/DataContext";

//Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  projectChunk: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    margin: theme.spacing(2),
    width: "100%",
  },
}));

interface ChunkProps {
  ids: string[];
}

const Chunk: FC<ChunkProps> = ({ ids }) => {
  const classes = useStyles();
  const projects = useProjects();

  return (
    <div className={classes.projectChunk}>
      {ids.map((id) => (
        <Project
          key={id}
          id={id}
          isSingle={ids.length === 1}
          {...projects![id]}
        />
      ))}
    </div>
  );
};

export default Chunk;
