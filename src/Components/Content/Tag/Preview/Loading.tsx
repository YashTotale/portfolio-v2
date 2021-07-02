// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    flex: 1,
    minWidth: 200,
    maxWidth: 250,
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
      height={339}
      className={clsx(classes.skeleton, props.className)}
    />
  );
};

export default Loading;
