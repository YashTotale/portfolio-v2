// React Imports
import React, { FC } from "react";
import { SIDEBAR_WIDTH } from "../../../Utils/constants";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.up("lg")]: {
      marginLeft: SIDEBAR_WIDTH,
    },
  },
}));

const Loading: FC = (props) => {
  const classes = useStyles();

  return <Skeleton variant="rect" className={classes.skeleton} />;
};

export default Loading;
