// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import StyledLink from "../../Atomic/StyledLink";
import MatchHighlight from "../../Atomic/MatchHighlight";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";
import { getTag } from "../../../Utils/Content/tags";
import { getProject } from "../../../Utils/Content/projects";
import {
  generateExperienceTitle,
  getSingleExperience,
} from "../../../Utils/Content/experience";
import { getArticle } from "../../../Utils/Content/articles";

// Material UI Imports
import { Link, Typography, TypographyProps } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: "inherit",
  },
  paragraph: {
    margin: theme.spacing(1, 0),
    "&:empty": {
      display: "none",
    },
  },
  unorderedList: {
    marginTop: 0,
    marginBottom: 0,
    width: "fit-content",
    textAlign: "left",
  },
}));

export interface RichTextProps {
  richText: Document;
  variant?: TypographyProps["variant"];
  ulClass?: string;
  toMatch?: string;
}

const RichText: FC<RichTextProps> = (props) => {
  const { richText, toMatch, variant = "body2", ulClass } = props;
  const classes = useStyles();
  const location = useLocation();
  const title = useTitle();

  const getData = (id: string): [string, string] | null => {
    const tag = getTag(id);
    if (tag) return [`/tags/${tag.slug}`, tag.title];

    const project = getProject(id);
    if (project) return [`/projects/${project.slug}`, project.title];

    const experience = getSingleExperience(id);
    if (experience)
      return [
        `/experience/${experience.slug}`,
        generateExperienceTitle(experience),
      ];

    const article = getArticle(id);
    if (article) return [`/articles/${article.slug}`, article.title];

    return null;
  };

  const options: Options = {
    renderText: (text) => (
      <Typography component="span" variant={variant} className={classes.text}>
        <MatchHighlight toMatch={toMatch}>{text}</MatchHighlight>
      </Typography>
    ),
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={classes.paragraph}>{children}</p>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className={clsx(classes.unorderedList, ulClass)}>{children}</ul>
      ),
      [INLINES.HYPERLINK]: (node, children) => {
        const url = node.data.uri as string;
        if (!url) return children;

        const isExternal = url.includes("http");

        return isExternal ? (
          <Link
            variant={variant}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </Link>
        ) : (
          <StyledLink
            variant={variant}
            to={{
              pathname: url,
              search: generateSearch(
                {
                  from_path: location.pathname,
                  from_type: "hyperlink",
                },
                title
              ),
            }}
          >
            {children}
          </StyledLink>
        );
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const entry = node.data.target;
        const id: string = entry.sys.id;

        const data = getData(id);
        if (!data) return children;

        const [path] = data;

        return (
          <StyledLink
            variant={variant}
            to={{
              pathname: path,
              search: generateSearch(
                {
                  from_path: location.pathname,
                  from_type: "entry_hyperlink",
                },
                title
              ),
            }}
            toMatch={toMatch}
          >
            {children}
          </StyledLink>
        );
      },
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        const entry = node.data.target;
        const id: string = entry.sys.id;

        const data = getData(id);
        if (!data) return children;

        const [path, title] = data;

        return (
          <StyledLink
            variant={variant}
            to={{
              pathname: path,
              search: generateSearch(
                {
                  from_path: location.pathname,
                  from_type: "embedded_entry",
                },
                title
              ),
            }}
            toMatch={toMatch}
          >
            {title}
          </StyledLink>
        );
      },
    },
  };

  return <>{documentToReactComponents(richText, options)}</>;
};

export default RichText;
