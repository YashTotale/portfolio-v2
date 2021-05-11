// React Imports
import React, { FC } from "react";
import { ExperienceFields } from "../../../Utils/types";

// Material UI Imports
import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
  },
}));

const SingleExperience: FC<ExperienceFields> = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Typography variant="h5">{props.title}</Typography>
    </Paper>
  );
};

export default SingleExperience;
