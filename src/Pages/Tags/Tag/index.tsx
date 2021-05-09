// React Imports
import React, { FC } from "react";
import Display from "./Display";
import { TagFields } from "../../../Utils/types";

// Material UI Imports
import { Divider, makeStyles, Paper } from "@material-ui/core";
import Related from "./Related";

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

type TagProps = TagFields & {
  id: string;
};

const Tag: FC<TagProps> = (props) => {
  const classes = useStyles();

  return (
    <Paper elevation={12} className={classes.container}>
      <Display {...props} />
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <Related {...props} />
    </Paper>
  );
};

export default Tag;
