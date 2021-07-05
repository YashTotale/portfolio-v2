// React Imports
import React, { FC, Fragment } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import TextRenderer from "./Components/TextRenderer";
import StyledLink from "../../Atomic/StyledLink";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";
import { getTag } from "../../../Utils/Content/tags";
import { getProject } from "../../../Utils/Content/projects";
import { getSingleExperience } from "../../../Utils/Content/experience";
import { getArticle } from "../../../Utils/Content/articles";

// Material UI Imports
import { Link, makeStyles, TypographyProps } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paragraph: {
    margin: theme.spacing(1, 0),
    "&:empty": {
      display: "none",
    },
  },
  unorderedList: {
    margin: theme.spacing(0),
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

  const options: Options = {
    renderText: (text) => (
      <TextRenderer variant={variant} toMatch={toMatch}>
        {text}
      </TextRenderer>
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

        const getLink = (): string => {
          const project = getProject(id);
          if (project) return `/projects/${project.slug}`;

          const experience = getSingleExperience(id);
          if (experience) return `/experience/${experience.slug}`;

          const tag = getTag(id);
          if (tag) return `/tags/${tag.slug}`;

          const article = getArticle(id);
          if (article) return `/articles/${article.slug}`;

          return "";
        };

        return (
          <StyledLink
            variant={variant}
            to={{
              pathname: getLink(),
              search: generateSearch(
                {
                  from_path: location.pathname,
                  from_type: "entry_hyperlink",
                },
                title
              ),
            }}
          >
            {children}
          </StyledLink>
        );
      },
    },
  };

  return <>{documentToReactComponents(richText, options)}</>;
};

export default RichText;
