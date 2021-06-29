// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import Title from "./Components/Title";
import Tags from "./Components/Tags";
import DynamicImage from "../../../DynamicImage";
import RichText from "../../../RichText";
import Associated from "../../Experience/Associated";
import {
  generateArticlePublished,
  getArticle,
} from "../../../../Utils/Content/articles";

// Material UI Imports
import {
  makeStyles,
  Paper,
  darken,
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

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  image: {
    margin: theme.spacing(1),

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
  },
  heading: {
    margin: theme.spacing(0, 1),
  },
  container: {
    borderRadius: "4px",
    border: `1px solid ${theme.palette.text.disabled}`,
    backgroundColor:
      theme.palette.type === "dark"
        ? darken(theme.palette.grey[800], 0.3)
        : theme.palette.grey[200],
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
  },

  associated: {
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
          <div className={classes.container}>
            <Typography
              variant={isSizeSmall ? "h5" : "h4"}
              align="center"
              className={classes.heading}
            >
              Associated With
            </Typography>
            <Associated
              id={article.associated.id}
              className={classes.associated}
            />
          </div>
        )}
        <div className={classes.container}>
          <Typography
            variant={isSizeSmall ? "h5" : "h4"}
            align="center"
            className={classes.heading}
          >
            Related Tags
          </Typography>
          <Tags {...article} />
        </div>
      </div>
    </Paper>
  );
};

export default Main;
