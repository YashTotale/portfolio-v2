// React Imports
import React, { FC } from "react";
import clsx from "clsx";

// Material UI Imports
import {
  darken,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

type Direction = "row" | "column";

interface StyleProps {
  direction: Direction;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  container: {
    borderRadius: "4px",
    border: `1px solid ${theme.palette.text.disabled}`,
    backgroundColor:
      theme.palette.type === "dark"
        ? darken(theme.palette.grey[800], 0.3)
        : theme.palette.grey[200],
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2),
  },
  heading: {
    margin: theme.spacing(0, 1),
  },
  items: {
    display: "flex",
    flexDirection: ({ direction }) => direction,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

interface MainContainerProps {
  title: string;
  direction?: Direction;
  className?: string;
}

const MainContainer: FC<MainContainerProps> = (props) => {
  const classes = useStyles({
    direction: props.direction ?? "row",
  });
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={clsx(classes.container, props.className)}>
      <Typography
        variant={isSizeSmall ? "h5" : "h4"}
        align="center"
        className={classes.heading}
      >
        {props.title}
      </Typography>
      <div className={classes.items}>{props.children}</div>
    </div>
  );
};

export default MainContainer;
