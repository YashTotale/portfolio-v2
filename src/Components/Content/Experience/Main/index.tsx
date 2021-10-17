// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import Title from "./Components/Title";
import MainContainer from "../../Shared/MainContainer";
import ProjectOverlay from "../../Project/Overlay";
import ArticleOverlay from "../../Article/Overlay";
import TagOverlay from "../../Tag/Overlay";
import DynamicImage from "../../../Atomic/DynamicImage";
import RichText from "../../../Custom/RichText";
import {
  generateExperienceTimeline,
  getSingleExperience,
} from "../../../../Utils/Content/experience";

// Material UI Imports
import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ButtonLinks from "../../Shared/ButtonLinks";

const useStyles = makeStyles((theme) => ({
  experience: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    padding: theme.spacing(2, 0, 1),
    width: "100%",
  },
  main: {
    padding: theme.spacing(0, 2),
  },
  info: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(1, 0),

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  image: {
    margin: theme.spacing(2),

    [theme.breakpoints.only("xl")]: {
      height: 225,
    },

    [theme.breakpoints.only("lg")]: {
      height: 200,
    },

    [theme.breakpoints.only("md")]: {
      height: 175,
    },

    [theme.breakpoints.only("sm")]: {
      height: 150,
    },

    [theme.breakpoints.only("xs")]: {
      height: 125,
    },
  },
  description: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    textAlign: "center",
    marginLeft: theme.spacing(1),
    flex: 1,

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  responsibilities: {
    paddingInlineStart: "15px",
  },
  associated: {
    margin: theme.spacing(2, 0),
    width: "100%",
  },
  overlay: {
    margin: theme.spacing(1, 2),
  },
}));

interface MainProps {
  id: string;
  className?: string;
}

const Main: FC<MainProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isDark = theme.palette.mode === "dark";

  const experience = getSingleExperience(props.id);
  if (!experience) return null;

  const image = isDark ? experience.darkImage : experience.lightImage;

  return (
    <Paper elevation={8} className={clsx(classes.experience, props.className)}>
      <Title {...experience} />
      <Typography align="center" variant="subtitle1" color="textSecondary">
        {generateExperienceTimeline(experience)}
      </Typography>
      <div className={classes.main}>
        <div className={classes.info}>
          <DynamicImage
            src={`${image.file.url}?h=300`}
            alt={image.title}
            className={classes.image}
          />
          <div className={classes.description}>
            <RichText
              variant={isSizeSmall ? "body2" : "body1"}
              richText={experience.description as Document}
            />
            <RichText
              variant={isSizeSmall ? "body2" : "body1"}
              richText={experience.responsibilities as Document}
              ulClass={classes.responsibilities}
            />
          </div>
          <ButtonLinks link={experience.link} github={experience.github} />
        </div>
        {!!experience.projects.length && (
          <MainContainer title="Related Projects">
            {experience.projects.map((project) => (
              <ProjectOverlay
                key={project.id}
                id={project.id}
                className={classes.overlay}
              />
            ))}
          </MainContainer>
        )}
        {!!experience.articles.length && (
          <MainContainer title="Related Articles">
            {experience.articles.map((article) => (
              <ArticleOverlay
                key={article.id}
                id={article.id}
                className={classes.overlay}
              />
            ))}
          </MainContainer>
        )}
        {!!experience.tags.length && (
          <MainContainer title="Related Tags" direction="row">
            {experience.tags.map((tag) => (
              <TagOverlay
                key={tag.id}
                id={tag.id}
                className={classes.overlay}
              />
            ))}
          </MainContainer>
        )}
      </div>
    </Paper>
  );
};

export default Main;
