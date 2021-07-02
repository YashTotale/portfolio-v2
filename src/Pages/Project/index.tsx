// React Imports
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import NotFound from "../NotFound";
import ProjectMain from "../../Components/Content/Project/Main";
import TopNav from "../../Components/Navigation/TopNav";
import BottomNav from "../../Components/Navigation/BottomNav";
import { generatePageTitle } from "../../Utils/funcs";
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
}));

interface Params {
  slug: string;
}

const Project: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();

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
        <BottomNav
          basePath="projects"
          label="Project"
          prevContent={prevProject}
          nextContent={nextProject}
        />
      </div>
    </>
  );
};

export default Project;
