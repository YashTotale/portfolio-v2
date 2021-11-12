//React Imports
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import { Paths } from "../../../Static/NavController";
import FloatingIcons from "../../Shared/FloatingIcons";
import Timeline from "../../Shared/Timeline";
import TagChip from "../../Tag/Mini";
import Title from "./Components/Title";
import RichText from "../../../Custom/RichText";
import DynamicImage from "../../../Atomic/DynamicImage";
import DynamicPaper from "../../../Atomic/DynamicPaper";
import Mini from "../../Shared/Mini";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import {
  generateExperienceTitle,
  getSingleExperience,
} from "../../../../Utils/Content/experience";
import {
  generateProjectTimeline,
  getProject,
} from "../../../../Utils/Content/projects";

// Redux Imports
import { getProjectsSort, setProjectsSort } from "../../../../Redux";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: `calc(50% - ${theme.spacing(4)})`,

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  projectTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  projectImageLink: {
    margin: theme.spacing(2, 0),
  },
  projectImage: {
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
    padding: theme.spacing(2),
  },
  associatedContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0.5, 1.5),
    width: "100%",
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

export interface PreviewProps {
  id: string;
  search?: string;
  className?: string;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const classes = useStyles();

  const project = getProject(props.id);
  if (!project) return null;

  return (
    <DynamicPaper ref={ref} className={clsx(classes.project, props.className)}>
      <div className={classes.projectTop}>
        <FloatingIcons
          link={project.link}
          linkLabel="Project"
          github={project.github}
        />
        <Link
          to={Paths.Project(project.slug)}
          className={classes.projectImageLink}
        >
          <DynamicImage
            src={`${project.image.file.url}?w=200`}
            alt={project.image.title}
            className={classes.projectImage}
          />
        </Link>
        <Title {...project} search={props.search} />
      </div>
      <div className={classes.projectDescription}>
        <RichText
          richText={project.description as Document}
          toMatch={props.search}
        />
      </div>
      {project.associated && (
        <div className={classes.associatedContainer}>
          <Mini
            content={getSingleExperience(project.associated.id)}
            pathFunc={Paths.SingleExperience}
            titleFunc={generateExperienceTitle}
            search={props.search}
          />
        </div>
      )}
      <div className={classes.projectTags}>
        {project.tags.map((tag) => (
          <TagChip key={tag.id} id={tag.id} search={props.search} />
        ))}
      </div>
      <HorizontalDivider />
      <Timeline
        sort="Newest"
        contentType="projects"
        getCurrentSort={getProjectsSort}
        setCurrentSort={setProjectsSort}
        search={props.search}
        className={classes.projectTimeline}
      >
        {generateProjectTimeline(project)}
      </Timeline>
    </DynamicPaper>
  );
});

export default Preview;
