// React Imports
import React, { forwardRef } from "react";
import clsx from "clsx";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: theme.spacing(2, 0),
    height: 700,
    width: "100%",
  },
}));

interface LoadingProps {
  className?: string;
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  const classes = useStyles();

  return (
    <Skeleton
      variant="rect"
      ref={ref}
      className={clsx(classes.skeleton, props.className)}
    />
  );
});

export default Loading;
