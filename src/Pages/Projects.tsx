//React Imports
import React, { FC } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { useProjects } from "../Context/ProjectsContext";
import { ProjectFields } from "../Utils/types";

//Material UI Imports
import {
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { chunk } from "../Utils/funcs";
import { getImageTitle, getImageUrl } from "../API/helpers";

const useStyles = makeStyles((theme) => ({
  projects: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  projectChunk: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    margin: theme.spacing(2),
    width: "100%",
  },
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 550,
    margin: theme.spacing(0, 2),
  },
  projectTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  projectImage: {
    margin: theme.spacing(2, 0),
  },
  projectTitle: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    textAlign: "center",
    width: 550 - theme.spacing(3),
  },
  projectInfo: {
    flexGrow: 1,
    width: "100%",
  },
}));

const ProjectsPage: FC = () => {
  const classes = useStyles();
  const projects = useProjects();

  const chunked = projects === null ? null : chunk(Object.keys(projects), 2);

  console.log(projects);

  return (
    <div className={classes.projects}>
      {chunked === null ? (
        <CircularProgress />
      ) : (
        chunked.map((chunk, i) => (
          <div key={i} className={classes.projectChunk}>
            {chunk.map((id) => (
              <Project key={id} {...projects![id]} />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

const Project: FC<ProjectFields> = ({ title, description, image }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.project} elevation={10}>
      <div className={classes.projectTop}>
        <img
          src={getImageUrl(image)}
          alt={getImageTitle(image)}
          width={175}
          className={classes.projectImage}
        />
        <Typography
          variant="h4"
          color="primary"
          className={classes.projectTitle}
        >
          {title}
        </Typography>
      </div>
      <div className={classes.projectInfo}>
        {documentToReactComponents(description as Document)}
      </div>
    </Paper>
  );
};

export default ProjectsPage;
