// React Imports
import React, { forwardRef } from "react";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    width: `calc(50% - ${theme.spacing(2)}px)`,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const Loading = forwardRef<HTMLDivElement>((props, ref) => {
  const classes = useStyles();

  return (
    <Skeleton
      ref={ref}
      variant="rect"
      height={600}
      className={classes.skeleton}
    />
  );
});

export default Loading;
