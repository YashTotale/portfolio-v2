// React Imports
import React, { forwardRef } from "react";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { Document } from "@contentful/rich-text-types";
import Title from "./Components/Title";
import FloatingIcons from "../../Shared/FloatingIcons";
import Timeline from "../../Shared/Timeline";
import Mini from "../../Shared/Mini";
import TagMini from "../../Tag/Mini";
import RichText from "../../../Custom/RichText";
import { useTitle } from "../../../../Context/HeadContext";
import DynamicImage from "../../../Atomic/DynamicImage";
import DynamicPaper from "../../../Atomic/DynamicPaper";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import { generateSearch } from "../../../../Utils/funcs";
import {
  generateExperienceTimeline,
  getSingleExperience,
} from "../../../../Utils/Content/experience";
import { getArticle } from "../../../../Utils/Content/articles";
import { getProject } from "../../../../Utils/Content/projects";

// Redux Imports
import { getExperienceSort, setExperienceSort } from "../../../../Redux";

// Material UI Imports
import { useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
    width: "100%",
  },
  display: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
  },
  imageLink: {
    margin: theme.spacing(2, 0, 1),
  },
  image: {
    [theme.breakpoints.only("xl")]: {
      width: 225,
    },

    [theme.breakpoints.only("lg")]: {
      width: 200,
    },

    [theme.breakpoints.only("md")]: {
      width: 200,
    },

    [theme.breakpoints.only("sm")]: {
      width: 175,
    },

    [theme.breakpoints.only("xs")]: {
      width: 150,
    },
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(1, 2),
  },
  description: {
    width: "100%",
    textAlign: "center",
  },
  responsibilities: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  minis: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    maxWidth: "100%",
  },
  mini: {
    margin: theme.spacing(0.5, 1),

    [theme.breakpoints.only("xs")]: {
      width: "100%",
      margin: theme.spacing(0.5, 0),
    },
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1, 2),
  },
  timeline: {
    margin: theme.spacing(1),
  },
}));

export interface PreviewProps {
  id: string;
  search?: string;
  className?: string;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const classes = useStyles();
  const location = useLocation();
  const title = useTitle();

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const experience = getSingleExperience(props.id);
  if (!experience) return null;

  const image = isDark ? experience.darkImage : experience.lightImage;
  const generateLink = (type: string) => ({
    pathname: `/experience/${experience.slug}`,
    search: generateSearch(
      {
        from_path: location.pathname,
        from_type: type,
      },
      title
    ),
  });

  return (
    <DynamicPaper
      ref={ref}
      className={clsx(classes.container, props.className)}
    >
      <div className={classes.display}>
        <FloatingIcons
          linkLabel="Website"
          link={experience.link}
          github={experience.github}
          linkedin={experience.linkedin}
          direction={isSizeXS ? "column" : "row"}
        />
        <Link to={generateLink("preview_image")} className={classes.imageLink}>
          <DynamicImage
            src={`${image.file.url}?w=300`}
            alt={image.title}
            className={classes.image}
          />
        </Link>
        <Title
          {...experience}
          generateLink={generateLink}
          search={props.search}
        />
      </div>
      <div className={classes.info}>
        <div className={classes.description}>
          <RichText
            richText={experience.description as Document}
            toMatch={props.search}
            variant={isSizeXS ? "body2" : "body1"}
          />
        </div>
        <div className={classes.responsibilities}>
          <RichText
            richText={experience.responsibilities as Document}
            toMatch={props.search}
          />
        </div>
      </div>
      {!!experience.projects.length || !!experience.articles.length ? (
        <>
          <div className={classes.minis}>
            {experience.projects.map((project) => (
              <Mini
                key={project.id}
                content={getProject(project.id)}
                basePath="projects"
                search={props.search}
                className={classes.mini}
              />
            ))}
            {experience.articles.map((article) => (
              <Mini
                key={article.id}
                content={getArticle(article.id)}
                basePath="articles"
                search={props.search}
                className={classes.mini}
              />
            ))}
          </div>
        </>
      ) : null}
      {!!experience.tags.length && (
        <div className={classes.tags}>
          {experience.tags.map((tag) => (
            <TagMini key={tag.id} id={tag.id} search={props.search} />
          ))}
        </div>
      )}
      <HorizontalDivider />
      <Timeline
        sort="Latest"
        contentType="experience"
        getCurrentSort={getExperienceSort}
        setCurrentSort={setExperienceSort}
        search={props.search}
        className={classes.timeline}
      >
        {generateExperienceTimeline(experience)}
      </Timeline>
    </DynamicPaper>
  );
});

export default Preview;
