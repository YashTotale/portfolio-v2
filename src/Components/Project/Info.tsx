// React Imports
import React, { FC, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import MatchHighlight from "../MatchHighlight";
import { useTags } from "../../Context/DataContext";

// Material UI Imports
import { Link, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  info: {
    flexGrow: 1,
    width: "100%",
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0, 2),
  },
}));

interface InfoProps {
  richText: Document;
  toMatch?: string;
}

const Info: FC<InfoProps> = ({ richText, toMatch }) => {
  const classes = useStyles();

  const options: Options = {
    renderText: (text) => <TextRenderer toMatch={toMatch}>{text}</TextRenderer>,
  };

  return (
    <div className={classes.info}>
      {documentToReactComponents(richText, options)}
    </div>
  );
};

interface TextRendererProps {
  children: string;
  toMatch?: string;
}

const TextRenderer: FC<TextRendererProps> = ({ children, toMatch = "" }) => {
  const tags = useTags();

  const parsed: (JSX.Element | string)[] = [];

  if (tags === null) parsed.push(children);
  else {
    const tagIdsArr = Object.keys(tags);
    const tagFieldsArr = Object.values(tags);

    for (let i = 0; i < children.length; i++) {
      const matchedTags = tagFieldsArr.filter(
        (tag) => tag.title === children.substring(i, i + tag.title.length)
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

      const id =
        tagIdsArr[
          tagFieldsArr.findIndex((fields) => fields.title === tag.title)
        ];

      parsed.push(
        <Link component={RouterLink} to={`/tags/${id}`} color="primary">
          <MatchHighlight toMatch={toMatch}>{tag.title}</MatchHighlight>
        </Link>
      );

      i += tag.title.length - 1;
    }
  }

  return (
    <>
      {parsed.map((el, i) =>
        typeof el === "string" ? (
          <Typography component="span" key={i} variant="body2">
            <MatchHighlight toMatch={toMatch}>{el}</MatchHighlight>
          </Typography>
        ) : (
          <Fragment key={i}>{el}</Fragment>
        )
      )}
    </>
  );
};

export default Info;
