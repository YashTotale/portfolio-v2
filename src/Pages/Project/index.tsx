// React Imports
import React, { FC } from "react";
import { useParams } from "react-router";
import NotFound from "../NotFound";
import ProjectMain from "../../Components/Content/Project/Main";
import NavButton from "../../Components/NavButton";
import { getProject, useSortedProjects } from "../../Utils/Content/projects";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  project: {
    margin: theme.spacing(1, 0),
  },
  buttons: {
    display: "flex",
    width: "100%",
    margin: theme.spacing(2, 0, 4),
  },
}));

interface Params {
  slug: string;
}

const Project: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();
  const project = getProject(slug, true);
  const sortedProjects = useSortedProjects();

  if (!project)
    return (
      <NotFound
        name="project"
        redirect="/projects"
        redirectName="Projects Page"
      />
    );

  const projectIndex = sortedProjects.findIndex((p) => p.id === project.id);
  const prevProject = sortedProjects[projectIndex - 1];
  const nextProject = sortedProjects[projectIndex + 1];

  return (
    <div className={classes.container}>
      <ProjectMain id={project.id} className={classes.project} />
      <div className={classes.buttons}>
        {prevProject && (
          <NavButton
            to={`/projects/${prevProject.slug}`}
            label={prevProject.title}
            type="previous"
            typeLabel="Previous Project"
          />
        )}
        {nextProject && (
          <NavButton
            to={`/projects/${nextProject.slug}`}
            label={nextProject.title}
            type="next"
            typeLabel="Next Project"
          />
        )}
      </div>
    </div>
  );
};

export default Project;
