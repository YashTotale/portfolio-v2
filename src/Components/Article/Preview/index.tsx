// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import Title from "./Title";
import FloatingIcons from "./FloatingIcons";
import DynamicPaper from "../../DynamicPaper";
import RichText from "../../RichText";
import MatchHighlight from "../../MatchHighlight";
import HorizontalDivider from "../../Divider/Horizontal";
import TagChip from "../../Tag/Chip";
import {
  generateArticlePublished,
  getArticle,
} from "../../../Utils/Content/articles";

// Material UI Imports
import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  article: {
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
  articleTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  articleImage: {
    margin: theme.spacing(2, 0),
    maxWidth: "65%",
    objectFit: "cover",

    [theme.breakpoints.only("xl")]: {
      height: 200,
    },
    [theme.breakpoints.only("lg")]: {
      height: 175,
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
  articleDescription: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  articleTags: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(1),
  },
  articlePublished: {
    margin: theme.spacing(1, 0),
  },
}));

interface PreviewProps {
  id: string;
  search?: string;
  className?: string;
}

const Preview: FC<PreviewProps> = (props) => {
  const classes = useStyles();
  const article = getArticle(props.id);

  if (!article) return null;

  return (
    <DynamicPaper className={clsx(classes.article, props.className)}>
      <Paper className={classes.articleTop}>
        <FloatingIcons {...article} />
        <img
          src={`${article.image.file.url}?w=300`}
          alt={article.image.title}
          className={classes.articleImage}
        />
        <Title title={article.title} id={props.id} />
      </Paper>
      <div className={classes.articleDescription}>
        <RichText richText={article.description as Document} variant="body1" />
      </div>
      <HorizontalDivider />
      <div className={classes.articleTags}>
        {article.tags.map((tag) => (
          <TagChip key={tag.id} id={tag.id} />
        ))}
      </div>
      <HorizontalDivider />
      <Typography className={classes.articlePublished} variant="body1">
        <MatchHighlight toMatch={props.search ?? ""}>
          {generateArticlePublished(article)}
        </MatchHighlight>
      </Typography>
    </DynamicPaper>
  );
};

export default Preview;
