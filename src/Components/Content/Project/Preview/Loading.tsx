// React Imports
import React, { forwardRef } from "react";
import clsx from "clsx";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    width: `calc(50% - ${theme.spacing(4)})`,

    [theme.breakpoints.down("md")]: {
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
      variant="rectangular"
      height={600}
      className={clsx(classes.skeleton, props.className)}
    />
  );
});

export default Loading;
