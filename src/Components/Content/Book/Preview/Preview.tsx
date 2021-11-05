// React Imports
import React, { FC } from "react";
import Title from "./Components/Title";
import Author from "./Components/Author";
import Likes from "./Components/Likes";
import Info from "./Components/Info";
import DynamicPaper from "../../../Atomic/DynamicPaper";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import VerticalDivider from "../../../Atomic/Divider/Vertical";
import { getRawBook } from "../../../../Utils/Content/books";

// Material UI Imports
import { useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0, 5.5),
    width: "100%",
    position: "relative",

    [theme.breakpoints.only("xs")]: {
      padding: 0,
    },
  },
  main: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    overflow: "scroll",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),

    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(2, 1),
    },

    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: theme.spacing(1),
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
      width: 155,
    },

    [theme.breakpoints.only("sm")]: {
      width: 150,
    },

    [theme.breakpoints.only("xs")]: {
      width: 125,
    },
  },
}));

export interface PreviewProps {
  id: string;
  search?: string;
  className?: string;
}

const Preview: FC<PreviewProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));

  const book = getRawBook(props.id);

  if (!book) return null;

  return (
    <DynamicPaper className={classes.container}>
      <div className={classes.titleContainer}>
        <Title {...book} search={props.search} />
        <Author {...book} search={props.search} />
        <Likes {...book} />
      </div>
      <HorizontalDivider />
      <div className={classes.main}>
        <div className={classes.imageContainer}>
          <img
            src={book.image}
            alt={book.title}
            title={book.title}
            className={classes.image}
          />
        </div>
        {isSizeSmall ? <HorizontalDivider height={2} /> : <VerticalDivider />}
        <Info {...book} search={props.search} />
      </div>
    </DynamicPaper>
  );
};

export default Preview;
