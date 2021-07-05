// React Imports
import React, { forwardRef } from "react";
import clsx from "clsx";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    width: `calc(50% - ${theme.spacing(4)}px)`,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

interface LoadingProps {
  className?: string;
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  const classes = useStyles();

  return (
    <Skeleton
      ref={ref}
      variant="rect"
      height={600}
      className={clsx(classes.skeleton, props.className)}
    />
  );
});

export default Loading;
