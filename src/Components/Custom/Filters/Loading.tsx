// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    width: "100%",
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: "10px",
    marginBottom: theme.spacing(1),
    overflow: "hidden",
    height: 58,

    [theme.breakpoints.only("xs")]: {
      height: 42,
    },
  },
}));

interface LoadingProps {
  className?: string;
}

const Loading: FC<LoadingProps> = (props) => {
  const classes = useStyles();

  return (
    <Skeleton
      variant="rect"
      className={clsx(classes.skeleton, props.className)}
    />
  );
};

export default Loading;
