// React Imports
import React, { cloneElement, FC } from "react";
import clsx from "clsx";

// Material UI Imports
import {
  makeStyles,
  darken,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: "4px",
    border: `1px solid ${theme.palette.text.disabled}`,
    backgroundColor:
      theme.palette.type === "dark"
        ? darken(theme.palette.grey[800], 0.3)
        : theme.palette.grey[200],
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    width: "100%",
  },
  heading: {
    margin: theme.spacing(0, 1),
  },
  associated: {
    margin: theme.spacing(2, 0),
  },
}));

interface RelatedProps {
  label: string;
  children: JSX.Element[];
}

const Related: FC<RelatedProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.container}>
      <Typography
        align="center"
        variant={isSizeSmall ? "h5" : "h4"}
        className={classes.heading}
      >
        {props.label}
      </Typography>
      {props.children.map((el) =>
        cloneElement(el, {
          className: clsx(el.props.className, classes.associated),
        })
      )}
    </div>
  );
};

export default Related;
