// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    flex: 1,
    minWidth: 225,
    height: 375,

    [theme.breakpoints.only("xs")]: {
      width: "100%",
      flex: "none",
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
      variant="rectangular"
      className={clsx(classes.skeleton, props.className)}
    />
  );
};

export default Loading;
