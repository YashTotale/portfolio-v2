// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Imports
import { Divider, makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  height: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  divider: {
    height: ({ height }) => `${height}px`,
  },
}));

interface HorizontalDividerProps {
  height?: number;
  flexItem?: boolean;
  className?: string;
}

const HorizontalDivider: FC<HorizontalDividerProps> = ({
  height = 1,
  flexItem = true,
  className,
}) => {
  const classes = useStyles({ height });

  return (
    <Divider flexItem={flexItem} className={clsx(classes.divider, className)} />
  );
};

export default HorizontalDivider;
