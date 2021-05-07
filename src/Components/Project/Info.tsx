// React Imports
import React, { FC, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { ProjectFields } from "../../Utils/types";
import { ProjectProps } from "../../Pages/Projects/Project";

// Material UI Imports
import { Link, makeStyles, Typography } from "@material-ui/core";
import MatchHighlight from "../MatchHighlight";

const useStyles = makeStyles((theme) => ({
  info: {
    flexGrow: 1,
    width: "100%",
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0, 2),
  },
}));

type InfoProps = Pick<ProjectFields, "description" | "tags"> & {
  matches?: ProjectProps["matches"];
};

const Info: FC<InfoProps> = ({ description, matches, tags }) => {
  const classes = useStyles();

  const options: Options = {
    renderText: (text) => (
      <TextRenderer matches={matches} tags={tags}>
        {text}
      </TextRenderer>
    ),
  };

  return (
    <div className={classes.info}>
      {documentToReactComponents(description as Document, options)}
    </div>
  );
};

interface TextRendererProps {
  tags: ProjectFields["tags"];
  children: string;
  matches?: ProjectProps["matches"];
}

const TextRenderer: FC<TextRendererProps> = ({ tags, matches, children }) => {
  const descriptionMatch = matches?.find((m) => m.key === "description");
  const indexOffset = descriptionMatch?.value?.indexOf(children) ?? -1;

  const parsed: (JSX.Element | string)[] = [];

  for (let i = 0; i < children.length; i++) {
    const matchedTags = tags.filter(
      (tag) =>
        tag.fields.title === children.substring(i, i + tag.fields.title.length)
    );
    const tag = matchedTags.length
      ? matchedTags.sort(
          (a, b) => b.fields.title.length - a.fields.title.length
        )[0]
      : undefined;

    let lastElement = parsed[parsed.length - 1];

    if (tag === undefined) {
      const char = children.substring(i, i + 1);

      if (typeof lastElement === "string") {
        parsed[parsed.length - 1] = parsed[parsed.length - 1] + char;
      } else {
        parsed.push(char);
      }
      lastElement = parsed[parsed.length - 1];

      if (indexOffset !== -1 && i === children.length - 1) {
        parsed[parsed.length - 1] = (
          <MatchHighlight
            keyToMatch="description"
            indexOffset={indexOffset + i + 1 - (lastElement as string).length}
            matches={matches}
          >
            {lastElement as string}
          </MatchHighlight>
        );
      }

      continue;
    }

    if (indexOffset !== -1 && parsed.length > 0) {
      parsed[parsed.length - 1] = (
        <MatchHighlight
          keyToMatch="description"
          indexOffset={indexOffset + i - (lastElement as string).length}
          matches={matches}
        >
          {lastElement as string}
        </MatchHighlight>
      );
    }

    parsed.push(
      <Link component={RouterLink} to={`/tags/${tag.sys.id}`} color="primary">
        {tag.fields.title}
      </Link>
    );

    i += tag.fields.title.length - 1;
  }

  return (
    <>
      {parsed.map((el, i) =>
        typeof el === "string" ? (
          <Typography component="span" key={i} variant="body2">
            {el}
          </Typography>
        ) : (
          <Fragment key={i}>{el}</Fragment>
        )
      )}
    </>
  );
};

export default Info;
