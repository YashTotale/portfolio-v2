// React Imports
import React, { FC, Fragment } from "react";
import { useLocation } from "react-router-dom";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import MatchHighlight from "./MatchHighlight";
import StyledLink from "./StyledLink";
import { getTag, getTags } from "../Utils/Content/tags";
import { getProject } from "../Utils/Content/projects";
import { getSingleExperience } from "../Utils/Content/experience";
import { getArticle } from "../Utils/Content/articles";

// Material UI Imports
import {
  Link,
  makeStyles,
  Typography,
  TypographyProps,
} from "@material-ui/core";

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
  text: {
    fontWeight: "inherit",
  },
}));

interface RichTextProps {
  richText: Document;
  variant?: TypographyProps["variant"];
  toMatch?: string;
}

const RichText: FC<RichTextProps> = ({
  richText,
  toMatch,
  variant = "body2",
}) => {
  const classes = useStyles();
  const location = useLocation();

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
        <ul className={classes.unorderedList}>{children}</ul>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <Link
          variant={variant}
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </Link>
      ),
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
              state: {
                from_path: location.pathname,
                from_type: "entry_hyperlink",
              },
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

interface TextRendererProps {
  children: string;
  variant: TypographyProps["variant"];
  toMatch?: string;
}

const TextRenderer: FC<TextRendererProps> = ({
  children,
  variant,
  toMatch = "",
}) => {
  const tags = getTags();
  const classes = useStyles();
  const location = useLocation();

  const parsed: (JSX.Element | string)[] = [];

  if (tags === null) parsed.push(children);
  else {
    for (let i = 0; i < children.length; i++) {
      const matchedTags = tags.filter(
        (tag) =>
          tag.title.toLowerCase() ===
          children.substring(i, i + tag.title.length).toLowerCase()
      );
      const tag = matchedTags.length
        ? matchedTags.sort((a, b) => b.title.length - a.title.length)[0]
        : undefined;

      if (tag === undefined) {
        const char = children.substring(i, i + 1);

        const last = parsed[parsed.length - 1];

        if (typeof last === "string") {
          parsed[parsed.length - 1] = last + char;
        } else {
          parsed.push(char);
        }

        continue;
      }

      parsed.push(
        <StyledLink
          to={{
            pathname: `/tags/${tag.slug}`,
            state: {
              from_path: location.pathname,
              from_type: "rich_text",
            },
          }}
          variant={variant}
          toMatch={toMatch}
        >
          {children.substring(i, i + tag.title.length)}
        </StyledLink>
      );

      i += tag.title.length - 1;
    }
  }

  return (
    <>
      {parsed.map((el, i) =>
        typeof el === "string" ? (
          <Typography
            className={classes.text}
            component="span"
            key={i}
            variant={variant}
          >
            <MatchHighlight toMatch={toMatch}>{el}</MatchHighlight>
          </Typography>
        ) : (
          <Fragment key={i}>{el}</Fragment>
        )
      )}
    </>
  );
};

export default RichText;
