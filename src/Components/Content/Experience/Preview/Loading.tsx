// React Imports
import React, { forwardRef } from "react";
import clsx from "clsx";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: theme.spacing(2, 0),
    height: 550,
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
      variant="rectangular"
      ref={ref}
      className={clsx(classes.skeleton, props.className)}
    />
  );
});

export default Loading;
