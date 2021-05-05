// React Imports
import React, { FC, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { ProjectFields } from "../../Utils/types";

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

type InfoProps = Pick<ProjectFields, "description" | "tags">;

const Info: FC<InfoProps> = ({ description, tags }) => {
  const classes = useStyles();

  const options: Options = {
    renderText: (text) => <TextRenderer tags={tags}>{text}</TextRenderer>,
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
}

const TextRenderer: FC<TextRendererProps> = ({ tags, children }) => {
  const parsed: (JSX.Element | string)[] = [];

  for (let i = 0; i < children.length; i++) {
    const match = tags.find(
      (tag) =>
        tag.fields.title === children.substring(i, i + tag.fields.title.length)
    );

    if (match === undefined) {
      const char = children.substring(i, i + 1);
      const lastElement = parsed[parsed.length - 1];

      if (typeof lastElement === "string") {
        parsed[parsed.length - 1] = parsed[parsed.length - 1] + char;
      } else {
        parsed.push(char);
      }

      continue;
    }

    parsed.push(
      <Link component={RouterLink} to={`/tags/${match.sys.id}`} color="primary">
        {match.fields.title}
      </Link>
    );

    i += match.fields.title.length - 1;
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
