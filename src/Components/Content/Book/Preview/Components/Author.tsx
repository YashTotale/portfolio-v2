// React Imports
import React, { FC } from "react";
import MatchHighlight from "../../../../MatchHighlight";
import { Book } from "../../../../../Utils/types";

// Material UI Imports
import { Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  author: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
  },
}));

type AuthorProps = Book & {
  search?: string;
};

const Author: FC<AuthorProps> = (props) => {
  const classes = useStyles();

  return (
    <Link
      href={props.authorLink}
      target="_blank"
      rel="noopener noreferrer"
      variant="subtitle1"
      className={classes.author}
    >
      <MatchHighlight toMatch={props.search}>{props.author}</MatchHighlight>
    </Link>
  );
};

export default Author;
