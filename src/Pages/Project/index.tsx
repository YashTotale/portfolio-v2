// React Imports
import React, { FC } from "react";
import { useParams } from "react-router";
import NotFound from "../NotFound";
import ProjectMain from "../../Components/Project/Main";
import { getProject } from "../../Utils/Content/projects";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface Params {
  slug: string;
}

const Project: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();
  const project = getProject(slug, true);

  if (!project)
    return (
      <NotFound
        name="project"
        redirect="/projects"
        redirectName="Projects Page"
      />
    );

  return (
    <div className={classes.container}>
      <ProjectMain id={project.id} />
    </div>
  );
};

export default Project;
