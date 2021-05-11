// React Imports
import React, { FC, useMemo } from "react";
import { useProjects } from "../../../../Context/DataContext";
import { ProjectFields, TagFields } from "../../../../Utils/types";

// Material UI Imports
import {
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { getImageTitle, getImageUrl } from "../../../../API/helpers";

const useStyles = makeStyles((theme) => ({
  tagProjectsTitle: {
    marginBottom: theme.spacing(1),
  },
  tagProjectsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
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

      if (isRelated) return [...arr, <Project key={project.id} {...project} />];

      return arr;
    }, [] as JSX.Element[]);

    if (!projectElements.length)
      return <Typography>No projects found with this tag</Typography>;

    return (
      <div className={classes.tagProjectsContainer}>{projectElements}</div>
    );
  }, [projects, props.id, classes.tagProjectsContainer]);

  return (
    <div>
      <Typography variant="h5" align="center">
        Related Projects
      </Typography>
      {relatedProjects}
    </div>
  );
};

const useProjectStyles = makeStyles((theme) => ({
  tagProject: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(2),

    [theme.breakpoints.only("xl")]: {
      width: 175,
    },

    [theme.breakpoints.only("lg")]: {
      width: 150,
    },

    [theme.breakpoints.only("md")]: {
      width: 150,
    },

    [theme.breakpoints.only("sm")]: {
      width: 125,
    },

    [theme.breakpoints.only("xs")]: {
      width: 100,
    },
  },
  tagProjectImage: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  tagProjectTitle: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
  },
}));

const Project: FC<ProjectFields> = (props) => {
  const classes = useProjectStyles();

  return (
    <Paper elevation={8} className={classes.tagProject}>
      <img
        src={getImageUrl(props.image)}
        alt={getImageTitle(props.image)}
        className={classes.tagProjectImage}
      />
      <Typography className={classes.tagProjectTitle}>{props.title}</Typography>
    </Paper>
  );
};

export default Projects;
