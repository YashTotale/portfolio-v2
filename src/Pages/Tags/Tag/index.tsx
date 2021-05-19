// React Imports
import React, { FC } from "react";
import Related from "./Related";
import Icon from "./Icon";
import HorizontalDivider from "../../../Components/Divider/Horizontal";
import VerticalDivider from "../../../Components/Divider/Vertical";
import { TagFields } from "../../../Utils/types";

// Material UI Imports
import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "95%",
    margin: theme.spacing(2, 0),
  },
  heading: {
    margin: theme.spacing(1, 0),
  },
  main: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
  },
}));

const Tag: FC<TagFields> = (props) => {
  const classes = useStyles();

  return (
    <Paper elevation={12} className={classes.container}>
      <Typography variant="h4" align="center" className={classes.heading}>
        {props.title}
      </Typography>
      <HorizontalDivider />
      <div className={classes.main}>
        <Icon {...props} />
        <VerticalDivider />
        <Related {...props} />
      </div>
    </Paper>
  );
};

export default Tag;
