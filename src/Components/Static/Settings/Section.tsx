// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import HorizontalDivider from "../../Atomic/Divider/Horizontal";

// Material UI Imports
import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderTop: `2px solid ${theme.palette.text.disabled}`,
    margin: theme.spacing(2, 0),
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[200],
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  title: {
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
    padding: theme.spacing(2, 1),

    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1),
    },
  },
}));

interface SectionProps {
  title: string;
  rightAction?: JSX.Element;
  className?: string;
}

const Section: FC<SectionProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div className={classes.titleContainer}>
        <Typography
          align="center"
          variant="h5"
          className={clsx(classes.title, props.className)}
        >
          {props.title}
        </Typography>
        {props.rightAction}
      </div>
      <HorizontalDivider />
      {props.children}
    </div>
  );
};

export default Section;
