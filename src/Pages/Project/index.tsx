// React Imports
import React, { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import ProjectMain from "../../Components/Content/Project/Main";
import NavButton from "../../Components/NavButton";
import { analytics } from "../../Utils/Config/firebase";
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
  topButtons: {
    display: "flex",
    width: "100%",
  },
  allProjects: {
    maxWidth: "25%",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "45%",
    },
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
  const location = useLocation();
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

  analytics.logEvent("page_view", {
    page_title: project.title,
    ...(location.state as Record<string, unknown>),
  });

  const projectIndex = sortedProjects.findIndex((p) => p.id === project.id);
  const prevProject = sortedProjects[projectIndex - 1];
  const nextProject = sortedProjects[projectIndex + 1];

  return (
    <div className={classes.container}>
      <div className={classes.topButtons}>
        <NavButton
          to={{
            pathname: "/projects",
            state: {
              from_path: location.pathname,
              from_type: "top_nav_button",
            },
          }}
          label="All Projects"
          type="next"
          typeLabel=""
          className={classes.allProjects}
        />
      </div>
      <ProjectMain id={project.id} className={classes.project} />
      <div className={classes.buttons}>
        {prevProject && (
          <NavButton
            to={{
              pathname: `/projects/${prevProject.slug}`,
              state: {
                from_path: location.pathname,
                from_type: "prev_nav_button",
              },
            }}
            label={prevProject.title}
            type="previous"
            typeLabel="Previous Project"
          />
        )}
        {nextProject && (
          <NavButton
            to={{
              pathname: `/projects/${nextProject.slug}`,
              state: {
                from_path: location.pathname,
                from_type: "next_nav_button",
              },
            }}
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
