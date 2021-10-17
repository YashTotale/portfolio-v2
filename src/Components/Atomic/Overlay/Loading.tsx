// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { OverlayProps, Size, SIZES } from "./Overlay";

// Material UI Imports
import { Theme, useTheme, Skeleton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

interface StyleProps {
  size: Size;
  borderRadius: string | number;
  padding: string | number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  skeleton: ({ size }) => ({
    border: `${theme.spacing(0.5)} solid ${theme.palette.text.primary}`,
    borderRadius: ({ borderRadius }) => borderRadius,
    padding: ({ padding }) => padding,

    [theme.breakpoints.only("xl")]: {
      width: size === "medium" ? SIZES[0] : SIZES[1],
      height: size === "medium" ? SIZES[0] : SIZES[1],
    },

    [theme.breakpoints.only("lg")]: {
      width: size === "medium" ? SIZES[1] : SIZES[2],
      height: size === "medium" ? SIZES[1] : SIZES[2],
    },

    [theme.breakpoints.only("md")]: {
      width: size === "medium" ? SIZES[2] : SIZES[3],
      height: size === "medium" ? SIZES[2] : SIZES[3],
    },

    [theme.breakpoints.only("sm")]: {
      width: size === "medium" ? SIZES[3] : SIZES[4],
      height: size === "medium" ? SIZES[3] : SIZES[4],
    },

    [theme.breakpoints.only("xs")]: {
      width: size === "medium" ? SIZES[4] : SIZES[5],
      height: size === "medium" ? SIZES[4] : SIZES[5],
    },
  }),
}));

const Loading: FC<OverlayProps> = (props) => {
  const theme = useTheme();
  const classes = useStyles({
    size: props.size ?? "medium",
    borderRadius: props.borderRadius ?? theme.spacing(0.5),
    padding: props.padding ?? theme.spacing(1.5),
  });

  return (
    <Skeleton
      variant="rectangular"
      className={clsx(classes.skeleton, props.className)}
    />
  );
};

export default Loading;
