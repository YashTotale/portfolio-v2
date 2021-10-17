// React Imports
import React, { FC } from "react";
import MatchHighlight from "../../../../Atomic/MatchHighlight";
import { Book } from "../../../../../Utils/types";

// Material UI Imports
import { Link, useTheme } from "@mui/material";

type AuthorProps = Book & {
  search?: string;
};

const Author: FC<AuthorProps> = (props) => {
  const theme = useTheme();

  return (
    <Link
      href={props.authorLink}
      target="_blank"
      rel="noopener noreferrer"
      variant="subtitle1"
      color={
        theme.palette.mode === "dark"
          ? theme.palette.grey[300]
          : theme.palette.grey[800]
      }
    >
      <MatchHighlight toMatch={props.search}>{props.author}</MatchHighlight>
    </Link>
  );
};

export default Author;
