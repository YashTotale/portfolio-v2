// React Imports
import React, { FC } from "react";
import Display from "./Display";
import Tags from "./Tags";
import DynamicPaper from "../../DynamicPaper";
import HorizontalDivider from "../../Divider/Horizontal";
import Associated from "../../Experience/Associated";
import { getProject } from "../../../Utils/Content/projects";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  badges: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  badge: {
    margin: theme.spacing(0.5),
    marginBottom: 0,
  },
  associated: {
    margin: theme.spacing(1, 2),
  },
}));

interface MainProps {
  id: string;
}

const Main: FC<MainProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const project = getProject(props.id);

  if (!project) return null;

  return (
    <DynamicPaper className={classes.project}>
      <Typography variant={isSizeSmall ? "h4" : "h3"} align="center">
        {project.title}
      </Typography>
      <Typography align="center" className={classes.timeline}>
        {project.start} - {project.end ?? "Present"}
      </Typography>
      <HorizontalDivider height={2} className={classes.divider} />
      {project.badges && (
        <>
          <div className={classes.badges}>
            {project.badges.map((badge) => (
              <a
                key={badge.id}
                target="_blank"
                rel="noopener noreferrer"
                href={badge.url}
                className={classes.badge}
              >
                <img src={badge.source} alt={badge.title} />
              </a>
            ))}
          </div>
          <HorizontalDivider height={2} className={classes.divider} />
        </>
      )}
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
            id={project.associated.id}
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
        Related Tags
      </Typography>
      <Tags {...project} />
    </DynamicPaper>
  );
};

export default Main;
