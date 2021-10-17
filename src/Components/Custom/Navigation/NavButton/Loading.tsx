// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { NavButtonProps } from "./NavButton";

// Material UI Imports
import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Skeleton } from "@mui/material";

interface StyleProps {
  type: NavButtonProps["type"];
  maxWidth: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  skeleton: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    borderRadius: theme.spacing(0.5),
    height: 60,
    width: 200,
    maxWidth: ({ maxWidth }) => maxWidth,
    marginRight: ({ type }) => (type === "previous" ? "auto" : 0),
    marginLeft: ({ type }) => (type === "next" ? "auto" : 0),
    paddingRight: ({ type }) => (type === "previous" ? theme.spacing(1) : 0),
    paddingLeft: ({ type }) => (type === "next" ? theme.spacing(1) : 0),
  },
}));

const Loading: FC<NavButtonProps> = (props) => {
  const classes = useStyles({
    type: props.type,
    maxWidth: props.maxWidth ?? "45%",
  });

  return (
    <Skeleton
      variant="rectangular"
      className={clsx(classes.skeleton, props.className)}
    />
  );
};

export default Loading;
