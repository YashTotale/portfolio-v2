// React Imports
import React, { FC } from "react";
import { getRawBook } from "../../../../Utils/Content/books";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    margin: theme.spacing(1.5, 1.5),
    width: 120,

    [theme.breakpoints.only("xs")]: {
      width: 100,
    },
  },
  image: {
    height: "85%",
    maxWidth: "100%",
  },
  title: {
    position: "absolute",
    color: theme.palette.text.secondary,
    maxWidth: "100%",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    bottom: 0,
  },
}));

interface MiniProps {
  id: string;
}

const Mini: FC<MiniProps> = (props) => {
  const classes = useStyles();
  const book = getRawBook(props.id);

  if (!book) return null;

  return (
    <div className={classes.container}>
      <img
        src={book.image}
        alt={book.title}
        title={book.title}
        className={classes.image}
      />
      <Typography
        variant="subtitle1"
        align="center"
        title={book.title}
        className={classes.title}
      >
        {book.title}
      </Typography>
    </div>
  );
};

export default Mini;
