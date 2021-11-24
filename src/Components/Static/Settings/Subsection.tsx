// React Imports
import React, { cloneElement, FC } from "react";
import clsx from "clsx";
import HorizontalDivider from "../../Atomic/Divider/Horizontal";

// Material UI Imports
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

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
    padding: theme.spacing(2, 1, 0.5),
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1.5),
  },
  children: {
    width: "100%",
    paddingLeft: theme.spacing(6.5),

    [theme.breakpoints.only("xs")]: {
      paddingLeft: theme.spacing(6),
    },
  },
}));

interface SubsectionProps {
  title: string | JSX.Element;
  icon: JSX.Element;
  className?: string;
}

const Subsection: FC<SubsectionProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const icon = cloneElement(props.icon, {
    className: classes.icon,
    fontSize: isSizeXS ? "small" : "medium",
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
      <div className={classes.children}>{props.children}</div>
      <HorizontalDivider />
    </div>
  );
};

export default Subsection;
