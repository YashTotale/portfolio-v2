// React Imports
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import Title from "./Components/Title";
import FloatingIcons from "../../Shared/FloatingIcons";
import Timeline from "../../Shared/Timeline";
import Mini from "../../Shared/Mini";
import { Paths } from "../../../Static/NavController";
import DynamicImage from "../../../Atomic/DynamicImage";
import DynamicPaper from "../../../Atomic/DynamicPaper";
import RichText from "../../../Custom/RichText";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import TagChip from "../../Tag/Mini";
import {
  generateExperienceTitle,
  getSingleExperience,
} from "../../../../Utils/Content/experience";
import {
  generateArticlePublished,
  getArticle,
} from "../../../../Utils/Content/articles";

// Redux Imports
import { getArticlesSort, setArticlesSort } from "../../../../Redux";

// Material UI Imports
import { useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  article: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: `calc(50% - ${theme.spacing(4)})`,

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  articleTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  articleImageLink: {
    margin: theme.spacing(2, 0),
    maxWidth: "65%",
  },
  articleImage: {
    width: "100%",
    objectFit: "contain",

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
  associatedContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0.5, 1.5),
    width: "100%",
  },
  articleTags: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(1),
  },
  articleTimeline: {
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
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const article = getArticle(props.id);

  if (!article) return null;

  return (
    <DynamicPaper ref={ref} className={clsx(classes.article, props.className)}>
      <div className={classes.articleTop}>
        <FloatingIcons link={article.link} linkLabel="Article" />
        <Link
          to={Paths.Article(article.slug)}
          className={classes.articleImageLink}
        >
          <DynamicImage
            src={`${article.image.file.url}?h=300`}
            alt={article.image.title}
            className={classes.articleImage}
          />
        </Link>
        <Title {...article} search={props.search} />
      </div>
      <div className={classes.articleDescription}>
        <RichText
          richText={article.description as Document}
          variant={isSizeXS ? "body2" : "body1"}
          toMatch={props.search}
        />
      </div>
      {article.associated && (
        <div className={classes.associatedContainer}>
          <Mini
            content={getSingleExperience(article.associated.id)}
            pathFunc={Paths.SingleExperience}
            titleFunc={generateExperienceTitle}
            search={props.search}
          />
        </div>
      )}
      <div className={classes.articleTags}>
        {article.tags.map((tag) => (
          <TagChip key={tag.id} id={tag.id} search={props.search} />
        ))}
      </div>
      <HorizontalDivider />
      <Timeline
        sort="Newest"
        contentType="articles"
        getCurrentSort={getArticlesSort}
        setCurrentSort={setArticlesSort}
        search={props.search}
        className={classes.articleTimeline}
      >
        {generateArticlePublished(article)}
      </Timeline>
    </DynamicPaper>
  );
});

export default Preview;
