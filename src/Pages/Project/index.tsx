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
    margin: "auto",

    [theme.breakpoints.only("xl")]: {
      width: "75%",
    },

    [theme.breakpoints.only("lg")]: {
      width: "85%",
    },

    [theme.breakpoints.only("md")]: {
      width: "85%",
    },

    [theme.breakpoints.only("sm")]: {
      width: "95%",
    },

    [theme.breakpoints.only("xs")]: {
      width: "95%",
    },
  },
}));

interface Params {
  id: string;
}

const Project: FC = () => {
  const { id } = useParams<Params>();
  const classes = useStyles();
  const project = getProject(id);

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
      <ProjectMain id={id} />
    </div>
  );
};

export default Project;
