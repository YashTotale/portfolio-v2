// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Imports
import { Divider, makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  width: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  divider: {
    width: ({ width }) => `${width}px`,
  },
}));

interface VerticalDividerProps {
  width?: number;
  flexItem?: boolean;
  className?: string;
}

const VerticalDivider: FC<VerticalDividerProps> = ({
  width = 2,
  flexItem = true,
  className,
}) => {
  const classes = useStyles({ width });

  return (
    <Divider
      flexItem={flexItem}
      orientation="vertical"
      className={clsx(classes.divider, className)}
    />
  );
};

export default VerticalDivider;
