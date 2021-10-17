// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: "5px",
    height: 200,
    alignSelf: "stretch",

    [theme.breakpoints.down("md")]: {
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
      variant="rectangular"
      className={clsx(classes.skeleton, props.className)}
    />
  );
};

export default Loading;
