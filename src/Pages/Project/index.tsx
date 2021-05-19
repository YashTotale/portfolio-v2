// React Imports
import React, { FC } from "react";
import { useParams } from "react-router";
import Display from "./Display";
import Tags from "./Tags";
import NotFound from "../NotFound";
import DynamicPaper from "../../Components/DynamicPaper";
import HorizontalDivider from "../../Components/Divider/Horizontal";
import Associated from "../../Components/Experience/Associated";
import { useProjects } from "../../Context/DataContext";

// Material UI Imports
import {
  CircularProgress,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",

    [theme.breakpoints.only("xl")]: {
      width: "75%",
    },

    [theme.breakpoints.only("lg")]: {
      width: "85%",
    },

    [theme.breakpoints.only("md")]: {
      width: "85%",
    },

    [theme.breakpoints.only("sm")]: {
      width: "95%",
    },

    [theme.breakpoints.only("xs")]: {
      width: "95%",
    },
  },
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    padding: theme.spacing(1, 0),
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  timeline: {
    marginTop: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  heading: {
    margin: theme.spacing(0, 1, 1),
  },
  associated: {
    margin: theme.spacing(1, 2),
  },
}));

interface Params {
  id: string;
}

const Project: FC = () => {
  const { id } = useParams<Params>();
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const projects = useProjects();

  if (projects === null)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  const project = projects.find((p) => p.id === id);

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
      <DynamicPaper className={classes.project}>
        <Typography variant={isSizeSmall ? "h4" : "h3"} align="center">
          {project.title}
        </Typography>
        <Typography align="center" className={classes.timeline}>
          {project.start} - {project.end ?? "Present"}
        </Typography>
        <HorizontalDivider height={2} className={classes.divider} />
        <Display {...project} />
        <HorizontalDivider height={2} className={classes.divider} />
        {project.associated && (
          <>
            <Typography
              variant={isSizeSmall ? "h5" : "h4"}
              align="center"
              className={classes.heading}
            >
              Associated With
            </Typography>
            <Associated
              {...project.associated.fields}
              id={project.associated.sys.id}
              className={classes.associated}
            />
            <HorizontalDivider height={2} className={classes.divider} />
          </>
        )}
        <Typography
          variant={isSizeSmall ? "h5" : "h4"}
          align="center"
          className={classes.heading}
        >
          Technologies Used
        </Typography>
        <Tags {...project} />
      </DynamicPaper>
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Project;
