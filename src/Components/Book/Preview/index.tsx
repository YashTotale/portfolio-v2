// React Imports
import React, { FC } from "react";
import Info from "./Info";
import DynamicPaper from "../../DynamicPaper";
import HorizontalDivider from "../../Divider/Horizontal";
import VerticalDivider from "../../Divider/Vertical";
import { getRawBook } from "../../../Utils/Content/books";

// Material UI Imports
import { Link, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    margin: theme.spacing(2),
    width: "45%",

    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: theme.spacing(2, 0),
    },
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  author: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
  },
  main: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
    height: "100%",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingBottom: 0,
    },
  },
  image: {
    margin: theme.spacing(2, 0),

    [theme.breakpoints.only("xl")]: {
      width: 200,
    },

    [theme.breakpoints.only("lg")]: {
      width: 175,
    },

    [theme.breakpoints.only("md")]: {
      width: 175,
    },

    [theme.breakpoints.only("sm")]: {
      width: 150,
    },

    [theme.breakpoints.only("xs")]: {
      width: 125,
    },
  },
}));

interface PreviewProps {
  id: string;
  className?: string;
}

const Preview: FC<PreviewProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const book = getRawBook(props.id);

  if (!book) return null;

  return (
    <DynamicPaper className={classes.container}>
      <div className={classes.titleContainer}>
        <Link
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
          variant="h6"
        >
          {book.title}
        </Link>
        <Link
          href={book.authorLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="subtitle1"
          className={classes.author}
        >
          {book.author}
        </Link>
        {book.rating && <Rating value={book.rating} readOnly />}
      </div>
      <HorizontalDivider />
      <div className={classes.main}>
        <div className={classes.imageContainer}>
          <img src={book.image} alt={book.title} className={classes.image} />
        </div>
        {!isSizeSmall && <VerticalDivider />}
        <Info {...book} />
      </div>
    </DynamicPaper>
  );
};

export default Preview;
