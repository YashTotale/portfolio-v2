// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import Title from "./Components/Title";
import FloatingIcons from "../../Shared/FloatingIcons";
import DynamicImage from "../../../DynamicImage";
import DynamicPaper from "../../../DynamicPaper";
import RichText from "../../../RichText";
import MatchHighlight from "../../../MatchHighlight";
import Mini from "../../Shared/Mini";
import TagMini from "../../Tag/Mini";
import HorizontalDivider from "../../../Divider/Horizontal";
import {
  generateExperienceTimeline,
  getSingleExperience,
} from "../../../../Utils/Content/experience";
import { getArticle } from "../../../../Utils/Content/articles";
import { getProject } from "../../../../Utils/Content/projects";

// Material UI Imports
import {
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
  image: {
    margin: theme.spacing(2, 0, 1),

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
  },
  mini: {
    margin: theme.spacing(0.5, 1),
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

const Preview: FC<PreviewProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const experience = getSingleExperience(props.id);
  if (!experience) return null;

  return (
    <DynamicPaper className={clsx(classes.container, props.className)}>
      <div className={classes.display}>
        <FloatingIcons
          linkLabel="Website"
          link={experience.link}
          github={experience.github}
          direction="row"
        />
        <DynamicImage
          src={`${experience.image.file.url}?w=225`}
          alt={experience.image.title}
          className={classes.image}
        />
        <Title {...experience} search={props.search} />
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
      {experience.projects.length || experience.articles.length ? (
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
      {experience.tags.length && (
        <>
          <div className={classes.tags}>
            {experience.tags.map((tag) => (
              <TagMini key={tag.id} id={tag.id} search={props.search} />
            ))}
          </div>
        </>
      )}
      <HorizontalDivider />
      <Typography
        variant={isSizeXS ? "body2" : "body1"}
        className={classes.timeline}
      >
        <MatchHighlight toMatch={props.search}>
          {generateExperienceTimeline(experience)}
        </MatchHighlight>
      </Typography>
    </DynamicPaper>
  );
};

export default Preview;
