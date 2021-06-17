// React Imports
import React, { FC } from "react";
import { getRawBook } from "../../Utils/Content/books";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {},
}));

interface PreviewProps {
  id: string;
  className?: string;
}

const Preview: FC<PreviewProps> = (props) => {
  const classes = useStyles();
  const book = getRawBook(props.id);

  if (!book) return null;

  return <div className={classes.container}></div>;
};

export default Preview;
