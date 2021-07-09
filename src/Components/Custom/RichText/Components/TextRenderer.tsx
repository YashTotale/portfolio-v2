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

const isAlphaNumeric = (char: string) => {
  if (!char.length) return false;

  const code = char.charCodeAt(0);

  if (
    !(code > 47 && code < 58) && // numeric (0-9)
    !(code > 64 && code < 91) && // upper alpha (A-Z)
    !(code > 96 && code < 123) // lower alpha (a-z)
  ) {
    return false;
  }

  return true;
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
  const title = useTitle();

  const parsed: (JSX.Element | string)[] = [];

  for (let i = 0; i < children.length; i++) {
    const matchedTags = tags.filter(
      (tag) =>
        tag.title.toLowerCase() ===
        children.substring(i, i + tag.title.length).toLowerCase()
    );
    const tag = matchedTags.length
      ? matchedTags.sort((a, b) => b.title.length - a.title.length)[0]
      : undefined;

    if (tag) {
      const beforeTag = children.charAt(i - 1);
      const afterTag = children.charAt(i + tag.title.length);

      if (!isAlphaNumeric(beforeTag) && !isAlphaNumeric(afterTag)) {
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

        continue;
      }
    }

    const char = children.charAt(i);

    const last = parsed[parsed.length - 1];

    if (typeof last === "string") {
      parsed[parsed.length - 1] = last + char;
    } else {
      parsed.push(char);
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
