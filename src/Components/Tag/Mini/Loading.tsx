// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Lab
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: theme.spacing(0.3),
    borderRadius: "16px",
    border: `1px solid ${theme.palette.secondary.main}`,
    height: 30,
    width: 100,

    [theme.breakpoints.only("xs")]: {
      height: 22,
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
