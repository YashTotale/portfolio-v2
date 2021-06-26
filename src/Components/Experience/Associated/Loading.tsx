// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Lab
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: "5px",
    height: 200,

    [theme.breakpoints.down("sm")]: {
      height: 500,
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
