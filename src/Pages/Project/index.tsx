// React Imports
import React, { FC } from "react";
import { useParams } from "react-router";
import NotFound from "../NotFound";
import { useProjects } from "../../Context/DataContext";
import Info from "../../Components/Project/Info";

// Material UI Imports
import {
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { getImageTitle, getImageUrl } from "../../API/helpers";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: theme.spacing(2),
  },
  projectDisplay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    padding: theme.spacing(2),
  },
  projectImage: {
    width: 200,
    marginLeft: theme.spacing(1),
  },
  projectInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  projectDescription: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface Params {
  id: string;
}

const Project: FC = () => {
  const { id } = useParams<Params>();
  const classes = useStyles();
  const projects = useProjects();

  if (projects === null)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  const project = projects[id];

  if (!project)
    return (
      <NotFound
        name="project"
        redirect="/projects"
        redirectName="Projects Page"
      />
    );

  return (
    <Container>
      <Paper className={classes.projectDisplay}>
        <img
          src={getImageUrl(project.image)}
          alt={getImageTitle(project.image)}
          className={classes.projectImage}
        />
        <div className={classes.projectInfo}>
          <Typography variant="h3" align="center">
            {project.title}
          </Typography>
          <div className={classes.projectDescription}>
            <Info {...project} />
          </div>
        </div>
      </Paper>
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Project;
