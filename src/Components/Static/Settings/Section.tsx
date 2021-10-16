// React Imports
import React, { FC } from "react";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  section: {
    width: "100%",
    borderTop: `2px solid ${theme.palette.text.disabled}`,
    margin: theme.spacing(2, 0),
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[300],
  },
  title: {
    margin: theme.spacing(1),
  },
}));

interface SectionProps {
  title: string;
}

const Section: FC<SectionProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <Typography align="center" variant="h5" className={classes.title}>
        {props.title}
      </Typography>
      {props.children}
    </div>
  );
};

export default Section;
