// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import Title from "./Components/Title";
import DynamicImage from "../../../Atomic/DynamicImage";
import RichText from "../../../Custom/RichText";
import Associated from "../../Shared/Associated";
import MainContainer from "../../Shared/MainContainer";
import TagOverlay from "../../Tag/Overlay";
import {
  generateArticlePublished,
  getArticle,
} from "../../../../Utils/Content/articles";
import {
  generateExperienceSubtitle,
  generateExperienceTimeline,
  generateExperienceTitle,
  getSingleExperience,
} from "../../../../Utils/Content/experience";

// Material UI Imports
import {
  makeStyles,
  Paper,
  useTheme,
  useMediaQuery,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  article: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    padding: theme.spacing(1, 0),
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
  const article = getArticle(props.id);

  if (!article) return null;

  return (
    <Paper elevation={8} className={clsx(classes.article, props.className)}>
      <Title {...article} />
      <Typography align="center" variant="subtitle1">
        {generateArticlePublished(article)}
      </Typography>
      <div className={classes.main}>
        <div className={classes.info}>
          <DynamicImage
            src={`${article.image.file.url}?h=225`}
            alt={article.image.title}
            className={classes.image}
          />
          <div className={classes.description}>
            <RichText
              variant={isSizeSmall ? "body2" : "body1"}
              richText={article.description as Document}
            />
          </div>
        </div>
        {article.associated && (
          <MainContainer title="Associated With" direction="column">
            <Associated
              content={getSingleExperience(article.associated.id)}
              basePath="experience"
              timelineFunc={generateExperienceTimeline}
              titleFunc={generateExperienceTitle}
              subtitleFunc={generateExperienceSubtitle}
              className={classes.associated}
            />
          </MainContainer>
        )}
        <MainContainer title="Related Tags">
          {article.tags.map((tag) => (
            <TagOverlay key={tag.id} id={tag.id} className={classes.tag} />
          ))}
        </MainContainer>
      </div>
    </Paper>
  );
};

export default Main;
