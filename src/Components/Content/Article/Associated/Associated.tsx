// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import RichText from "../../../RichText";
import DynamicImage from "../../../DynamicImage";
import StyledLink from "../../../StyledLink";
import MatchHighlight from "../../../MatchHighlight";
import VerticalDivider from "../../../Divider/Vertical";
import HorizontalDivider from "../../../Divider/Horizontal";
import {
  generateArticlePublished,
  getArticle,
} from "../../../../Utils/Content/articles";

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
    alignItems: "center",
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: "5px",

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  image: {
    margin: theme.spacing(2),
    objectFit: "contain",

    [theme.breakpoints.only("xl")]: {
      height: 175,
    },

    [theme.breakpoints.only("lg")]: {
      height: 150,
    },

    [theme.breakpoints.only("md")]: {
      height: 150,
    },

    [theme.breakpoints.only("sm")]: {
      height: 125,
    },

    [theme.breakpoints.only("xs")]: {
      height: 100,
    },
  },
  info: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
  },
  title: {
    margin: theme.spacing(1),

    [theme.breakpoints.only("xs")]: {
      lineHeight: 1.3,
    },
  },
  description: {
    padding: theme.spacing(1),
    width: "100%",
    textAlign: "center",
    flex: 1,
  },
  timeline: {
    margin: theme.spacing(1),
  },
}));

export interface AssociatedProps {
  id: string;
  className?: string;
  search?: string;
}

const Associated: FC<AssociatedProps> = ({ id, search, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const article = getArticle(id);
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  if (!article) return null;

  return (
    <div className={clsx(classes.container, className)}>
      <DynamicImage
        src={`${article.image.file.url}?h=175`}
        alt={article.image.title}
        className={classes.image}
      />
      {!isSizeXS && <VerticalDivider />}
      <div className={classes.info}>
        <StyledLink
          variant="h6"
          align="center"
          to={{
            pathname: `/articles/${article.slug}`,
            state: {
              from_path: location.pathname,
              from_type: "associated",
            },
          }}
          className={classes.title}
        >
          {article.title}
        </StyledLink>
        <HorizontalDivider />
        <div className={classes.description}>
          <RichText richText={article.description as Document} />
        </div>
        <HorizontalDivider />
        <div className={classes.timeline}>
          <Typography>
            <MatchHighlight toMatch={search}>
              {generateArticlePublished(article)}
            </MatchHighlight>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Associated;
