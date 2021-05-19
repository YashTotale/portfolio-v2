// React Imports
import React, { FC, ImgHTMLAttributes } from "react";
import clsx from "clsx";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  image: {
    transition: theme.transitions.create("transform", {
      duration: "0.4s",
    }),
    "&:hover": {
      transform: "rotate(0.01turn) scale(1.05)",
    },
  },
}));

const DynamicImage: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const classes = useStyles();

  return (
    <img
      {...props}
      alt={props.alt}
      className={clsx(classes.image, props.className)}
    />
  );
};

export default DynamicImage;
