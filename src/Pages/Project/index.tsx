// React Imports
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import NotFound from "../NotFound";
import { Paths } from "../../Components/Static/NavController";
import ProjectMain from "../../Components/Content/Project/Main";
import TopNav from "../../Components/Custom/Navigation/TopNav";
import BottomNav from "../../Components/Custom/Navigation/BottomNav";
import { generatePageTitle } from "../../Utils/funcs";
import { getProject, useSortedProjects } from "../../Utils/Content/projects";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";

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
  const sortedProjects = useSortedProjects();

  useAnalytics(project?.title);

  if (!project)
    return (
      <NotFound
        name="project"
        redirect={Paths.Projects}
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
        <TopNav allPath={Paths.Projects} allLabel="Projects" />
        <ProjectMain id={project.id} />
        <BottomNav
          pathFunc={Paths.Project}
          label="Project"
          prevContent={prevProject}
          nextContent={nextProject}
        />
      </div>
    </>
  );
};

export default Project;
