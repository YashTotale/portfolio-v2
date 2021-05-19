// React Imports
import React, { FC } from "react";
import Related from "./Related";
import Display from "./Display";
import VerticalDivider from "../../../Components/Divider/Vertical";
import { TagFields } from "../../../Utils/types";

// Material UI Imports
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "95%",
    margin: theme.spacing(2, 0),
  },
  divider: {
    width: "2px",
  },
}));

const Tag: FC<TagFields> = (props) => {
  const classes = useStyles();

  return (
    <Paper elevation={12} className={classes.container}>
      <Display {...props} />
      <VerticalDivider />
      <Related {...props} />
    </Paper>
  );
};

export default Tag;
