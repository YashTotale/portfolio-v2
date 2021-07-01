// React Imports
import React, { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import NotFound from "../NotFound";
import ProjectMain from "../../Components/Content/Project/Main";
import BackButton from "../../Components/BackButton";
import NavButton from "../../Components/NavButton";
import { useTitle } from "../../Context/HeadContext";
import {
  generatePageTitle,
  generateSearch,
  getSearch,
} from "../../Utils/funcs";
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
    alignItems: "center",
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
    marginTop: theme.spacing(2),
  },
}));

interface Params {
  slug: string;
}

const Project: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();

  const location = useLocation();
  const title = useTitle();
  const search = getSearch(location.search);

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
    ...search,
  });

  const projectIndex = sortedProjects.findIndex((p) => p.id === project.id);
  const prevProject = sortedProjects[projectIndex - 1];
  const nextProject = sortedProjects[projectIndex + 1];

  return (
    <>
      <Helmet>
        <title>{generatePageTitle(project.title)}</title>
      </Helmet>
      <div className={classes.container}>
        <div className={classes.topButtons}>
          <BackButton />
          <NavButton
            to={{
              pathname: "/projects",
              search: generateSearch(
                {
                  from_path: location.pathname,
                  from_type: "top_nav_button",
                },
                title
              ),
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
                search: generateSearch(
                  {
                    from_path: location.pathname,
                    from_type: "prev_nav_button",
                  },
                  title
                ),
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
                search: generateSearch(
                  {
                    from_path: location.pathname,
                    from_type: "next_nav_button",
                  },
                  title
                ),
              }}
              label={nextProject.title}
              type="next"
              typeLabel="Next Project"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Project;
