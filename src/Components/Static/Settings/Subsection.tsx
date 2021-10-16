// React Imports
import React, { cloneElement, FC } from "react";
import clsx from "clsx";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";
import HorizontalDivider from "../../Atomic/Divider/Horizontal";

const useStyles = makeStyles((theme) => ({
  subsection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2, 1),
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1.5),
  },
}));

interface SubsectionProps {
  title: string;
  icon: JSX.Element;
  className?: string;
}

const Subsection: FC<SubsectionProps> = (props) => {
  const classes = useStyles();
  const icon = cloneElement(props.icon, {
    className: classes.icon,
  });

  return (
    <div className={classes.subsection}>
      <div className={classes.titleContainer}>
        {icon}
        <Typography
          align="left"
          variant="h6"
          className={clsx(classes.title, props.className)}
        >
          {props.title}
        </Typography>
      </div>
      {props.children}
      <HorizontalDivider />
    </div>
  );
};

export default Subsection;
