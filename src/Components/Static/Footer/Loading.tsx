// React Imports
import React, { FC } from "react";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    width: "100%",
    height: 75,
  },
}));

const Loading: FC = (props) => {
  const classes = useStyles();

  return <Skeleton variant="rectangular" className={classes.skeleton} />;
};

export default Loading;
