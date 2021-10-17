// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    width: "100%",
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
      height={450}
      className={clsx(classes.skeleton, props.className)}
    />
  );
};

export default Loading;
