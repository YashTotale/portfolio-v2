// React Imports
import React, { FC, Fragment } from "react";
import { useLocation } from "react-router-dom";
import MatchHighlight from "../../../Atomic/MatchHighlight";
import StyledLink from "../../../Atomic/StyledLink";
import { useTitle } from "../../../../Context/HeadContext";
import { generateSearch } from "../../../../Utils/funcs";
import { getTags } from "../../../../Utils/Content/tags";

// Material UI Imports
import { makeStyles, Typography, TypographyProps } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: "inherit",
  },
}));

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
  const title = useTitle();

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
            search: generateSearch(
              {
                from_path: location.pathname,
                from_type: "rich_text",
              },
              title
            ),
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

export default TextRenderer;
