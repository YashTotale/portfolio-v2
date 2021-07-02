// React Imports
import React, { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import NotFound from "../NotFound";
import ProjectMain from "../../Components/Content/Project/Main";
import TopNav from "../../Components/TopNav";
import NavButton from "../../Components/NavButton";
import { useTitle } from "../../Context/HeadContext";
import { generatePageTitle, generateSearch } from "../../Utils/funcs";
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

  const project = getProject(slug, true);
  const sortedProjects = useSortedProjects();

  useAnalytics(project?.title);

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
    <>
      <Helmet>
        <title>{generatePageTitle(project.title)}</title>
      </Helmet>
      <div className={classes.container}>
        <TopNav allPath="projects" allLabel="Projects" />
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
