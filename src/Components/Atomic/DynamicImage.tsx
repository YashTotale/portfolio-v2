// React Imports
import React, { ImgHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  image: {
    transition: theme.transitions.create("transform", {
      duration: "0.4s",
    }),
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

const DynamicImage = forwardRef<
  HTMLImageElement,
  ImgHTMLAttributes<HTMLImageElement>
>((props) => {
  const classes = useStyles();

  return (
    <img
      {...props}
      alt={props.alt}
      title={props.alt}
      className={clsx(classes.image, props.className)}
    />
  );
});

export default DynamicImage;
