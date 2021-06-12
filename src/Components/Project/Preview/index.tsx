//React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import FloatingIcons from "./FloatingIcons";
import TagChip from "../../Tag/Chip";
import Title from "./Title";
import RichText from "../../RichText";
import MatchHighlight from "../../MatchHighlight";
import DynamicImage from "../../DynamicImage";
import DynamicPaper from "../../DynamicPaper";
import HorizontalDivider from "../../Divider/Horizontal";
import { getProject } from "../../../Utils/Content/projects";

// Redux Imports
import { useSelector } from "react-redux";
import { getProjectsSearch } from "../../../Redux";

//Material UI Imports
import {
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2),
    width: "45%",

    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: theme.spacing(2, 0),
    },
  },
  projectTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  projectImage: {
    margin: theme.spacing(2, 0),

    [theme.breakpoints.only("xl")]: {
      width: 200,
    },

    [theme.breakpoints.only("lg")]: {
      width: 175,
    },

    [theme.breakpoints.only("md")]: {
      width: 175,
    },

    [theme.breakpoints.only("sm")]: {
      width: 150,
    },

    [theme.breakpoints.only("xs")]: {
      width: 125,
    },
  },
  projectDescription: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(2, 1),
  },
  projectTags: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(1),
  },
  projectTimeline: {
    margin: theme.spacing(1, 0),
  },
}));

interface ProjectProps {
  id: string;
}

const Project: FC<ProjectProps> = (props) => {
  const classes = useStyles();
  const search = useSelector(getProjectsSearch);

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const project = getProject(props.id);
  if (!project) return null;

  return (
    <DynamicPaper className={classes.project}>
      <Paper className={classes.projectTop} elevation={3}>
        <FloatingIcons {...project} />
        <DynamicImage
          src={`${project.image.file.url}?w=200`}
          alt={project.image.title}
          className={classes.projectImage}
        />
        <Title title={project.title} id={props.id} />
      </Paper>
      <div className={classes.projectDescription}>
        <RichText richText={project.description as Document} toMatch={search} />
      </div>
      <HorizontalDivider />
      <div className={classes.projectTags}>
        {project.tags.map((tag) => (
          <TagChip key={tag.id} id={tag.id} />
        ))}
      </div>
      <HorizontalDivider />
      <Typography
        className={classes.projectTimeline}
        variant={isSizeXS ? "body2" : "body1"}
      >
        <MatchHighlight toMatch={search}>{project.start}</MatchHighlight> -{" "}
        <MatchHighlight toMatch={search}>
          {project.end ?? "Present"}
        </MatchHighlight>
      </Typography>
    </DynamicPaper>
  );
};

export default Project;
