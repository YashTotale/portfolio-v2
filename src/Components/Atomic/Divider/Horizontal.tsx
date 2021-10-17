// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Imports
import { Divider, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

interface StyleProps {
  height: number;
  color?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  divider: {
    height: ({ height }) => `${height}px`,
    backgroundColor: ({ color }) => color,
  },
}));

interface HorizontalDividerProps {
  height?: number;
  flexItem?: boolean;
  color?: string;
  className?: string;
}

const HorizontalDivider: FC<HorizontalDividerProps> = ({
  height = 1,
  flexItem = true,
  color,
  className,
}) => {
  const classes = useStyles({ height, color });

  return (
    <Divider flexItem={flexItem} className={clsx(classes.divider, className)} />
  );
};

export default HorizontalDivider;
