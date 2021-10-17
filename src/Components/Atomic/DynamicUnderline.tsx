// React Imports
import React, { FC, ReactNode } from "react";

// Material UI Imports
import { Theme, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

interface StyleProps {
  enabled: boolean;
  hasRemove: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  element: {
    display: "inline-block",
    overflow: "hidden",
    position: "relative",
    cursor: ({ enabled, hasRemove }) =>
      enabled && !hasRemove ? "default" : "pointer",
    "&&:after": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: "-1px",
      width: "100%",
      height: "2px",
      backgroundColor: theme.palette.secondary.main,
      transition: "transform 300ms",
      opacity: 1,
      transform: ({ enabled }) =>
        enabled ? "translate3d(0, 0, 0)" : "translate3d(-100%, 0, 0)",
    },
    "&:hover::after, &:focus::after": {
      transform: () => "translate3d(0, 0, 0)",
    },
  },
}));

interface DynamicUnderlineProps {
  tooltipLabel: string;
  tooltipLabelEnabled?: string;
  onClick: () => void;
  onRemove?: () => void;
  children: NonNullable<ReactNode>;
  enabled?: boolean;
}

const DynamicUnderline: FC<DynamicUnderlineProps> = (props) => {
  const classes = useStyles({
    enabled: props.enabled ?? false,
    hasRemove: !!props.onRemove,
  });

  const span = (
    <span
      className={classes.element}
      onClick={props.enabled ? props.onRemove : props.onClick}
    >
      {props.children}
    </span>
  );

  if (props.enabled && !props.onRemove && !props.tooltipLabelEnabled)
    return span;

  return (
    <Tooltip
      title={
        props.enabled && props.tooltipLabelEnabled
          ? props.tooltipLabelEnabled
          : props.tooltipLabel
      }
    >
      {span}
    </Tooltip>
  );
};

export default DynamicUnderline;
