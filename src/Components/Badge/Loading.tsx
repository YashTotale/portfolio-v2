// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Lab
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    width: 100,
    height: 25,
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
