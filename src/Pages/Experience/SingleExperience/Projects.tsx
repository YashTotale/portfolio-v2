// React Imports
import React, { FC } from "react";
import { useProjects } from "../../../Context/DataContext";

// Material UI Imports
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import Overlay from "../../../Components/Overlay";

const useStyles = makeStyles((theme) => ({
  projectsContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: theme.spacing(-1),
  },
  project: {
    margin: theme.spacing(1),
  },
}));

interface ProjectsProps {
  id: string;
}

const Projects: FC<ProjectsProps> = ({ id }) => {
  const classes = useStyles();
  const projects = useProjects();

  if (projects === null) return <CircularProgress />;

  const relatedProjects = projects.filter((p) => p.associated?.sys.id === id);

  if (!relatedProjects.length)
    return (
      <Typography variant="body2">
        No projects found related to this experience
      </Typography>
    );

  return (
    <div className={classes.projectsContainer}>
      {relatedProjects.map((project) => (
        <Overlay
          label={project.title}
          icon={project.image}
          to={`/projects/${project.id}`}
          key={project.id}
          className={classes.project}
        />
      ))}
    </div>
  );
};

export default Projects;
