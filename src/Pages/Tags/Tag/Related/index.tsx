// React Imports
import React, { FC } from "react";
import { TagFields } from "../../../../Utils/types";

// Material UI Imports
import { makeStyles } from "@material-ui/core";
import Projects from "./Projects";

const useStyles = makeStyles((theme) => ({
  tagRelated: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    padding: theme.spacing(2),
    width: "70%",
  },
}));

const Related: FC<TagFields> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.tagRelated}>
      <Projects {...props} />
    </div>
  );
};

export default Related;
