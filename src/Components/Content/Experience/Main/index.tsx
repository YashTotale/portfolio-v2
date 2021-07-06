// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import Title from "./Components/Title";
import MainContainer from "../../Shared/MainContainer";
import Associated from "../../Shared/Associated";
import TagOverlay from "../../Tag/Overlay";
import DynamicImage from "../../../Atomic/DynamicImage";
import RichText from "../../../Custom/RichText";
import {
  generateExperienceTimeline,
  getSingleExperience,
} from "../../../../Utils/Content/experience";
import {
  generateProjectTimeline,
  getProject,
} from "../../../../Utils/Content/projects";
import {
  generateArticlePublished,
  getArticle,
} from "../../../../Utils/Content/articles";

// Material UI Imports
import {
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

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

    [theme.breakpoints.down("sm")]: {
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
    marginLeft: theme.spacing(1),
    flex: 1,

    [theme.breakpoints.down("sm")]: {
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
  tag: {
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
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const experience = getSingleExperience(props.id);
  if (!experience) return null;

  return (
    <Paper elevation={8} className={clsx(classes.experience, props.className)}>
      <Title {...experience} />
      <Typography align="center" variant="subtitle1" color="textSecondary">
        {generateExperienceTimeline(experience)}
      </Typography>
      <div className={classes.main}>
        <div className={classes.info}>
          <DynamicImage
            src={`${experience.image.file.url}?h=300`}
            alt={experience.image.title}
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
        </div>
        {!!experience.projects.length && (
          <MainContainer title="Related Projects">
            {experience.projects.map((project) => (
              <Associated
                key={project.id}
                content={getProject(project.id)}
                basePath="projects"
                timelineFunc={generateProjectTimeline}
                className={classes.associated}
              />
            ))}
          </MainContainer>
        )}
        {!!experience.articles.length && (
          <MainContainer title="Related Articles">
            {experience.articles.map((article) => (
              <Associated
                key={article.id}
                content={getArticle(article.id)}
                basePath="articles"
                timelineFunc={generateArticlePublished}
                className={classes.associated}
              />
            ))}
          </MainContainer>
        )}
        <MainContainer title="Related Tags">
          {experience.tags.map((tag) => (
            <TagOverlay key={tag.id} id={tag.id} className={classes.tag} />
          ))}
        </MainContainer>
      </div>
    </Paper>
  );
};

export default Main;
