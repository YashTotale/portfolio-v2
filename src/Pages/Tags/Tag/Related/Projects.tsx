// React Imports
import React, { FC, useMemo } from "react";
import Overlay from "../../../../Components/Overlay";
import { useProjects } from "../../../../Context/DataContext";
import { TagFields } from "../../../../Utils/types";

// Material UI Imports
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  projectsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  project: {
    margin: theme.spacing(2),
  },
}));

type ProjectsProps = TagFields;

const Projects: FC<ProjectsProps> = (props) => {
  const classes = useStyles();
  const projects = useProjects();

  const relatedProjects = useMemo(() => {
    if (projects === null) return <CircularProgress />;

    const projectElements = projects.reduce((arr, project) => {
      const isRelated = project.tags.find((tag) => tag.sys.id === props.id);

      if (isRelated)
        return [
          ...arr,
          <Overlay
            key={project.id}
            icon={project.image}
            label={project.title}
            to={`/projects/${project.id}`}
            className={classes.project}
          />,
        ];

      return arr;
    }, [] as JSX.Element[]);

    if (!projectElements.length)
      return <Typography>No projects found with this tag</Typography>;

    return <div className={classes.projectsContainer}>{projectElements}</div>;
  }, [projects, props.id, classes.projectsContainer, classes.project]);

  return (
    <div>
      <Typography variant="h5" align="center">
        Related Projects
      </Typography>
      {relatedProjects}
    </div>
  );
};

export default Projects;
