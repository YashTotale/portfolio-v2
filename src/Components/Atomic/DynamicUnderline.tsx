// React Imports
import React, { FC } from "react";

// Material UI Imports
import { makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  element: {
    display: "inline-block",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    "&&:after": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: "-1px",
      width: "100%",
      height: "0.1em",
      backgroundColor: theme.palette.secondary.main,
      transition: "transform 300ms",
      opacity: 1,
      transform: "translate3d(-100%, 0, 0)",
    },
    "&:hover::after, &:focus::after": {
      transform: "translate3d(0, 0, 0)",
    },
  },
}));

interface DynamicUnderlineProps {
  tooltipLabel: string;
  label: string;
  onClick: () => void;
}

const DynamicUnderline: FC<DynamicUnderlineProps> = (props) => {
  const classes = useStyles();

  return (
    <Tooltip title={props.tooltipLabel}>
      <span className={classes.element} onClick={props.onClick}>
        {props.label}
      </span>
    </Tooltip>
  );
};

export default DynamicUnderline;
