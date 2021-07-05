// React Imports
import React, { FC } from "react";
import LinkIcon from "../../Atomic/Icon/Link";

// Material UI Imports
import { makeStyles, Theme } from "@material-ui/core";
import { GitHub, Launch } from "@material-ui/icons";

type Direction = "row" | "column";

interface StyleProps {
  direction: Direction;
  top: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  floatingIcons: {
    display: "flex",
    flexDirection: ({ direction }) => direction,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: ({ top }) => theme.spacing(top),
    right: theme.spacing(1),
  },
  iconButton: {
    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(1),
    },
  },
}));

interface FloatingIconsProps {
  linkLabel?: string;
  link?: string;
  github?: string;
  direction?: Direction;
  top?: number;
}

const FloatingIcons: FC<FloatingIconsProps> = (props) => {
  const classes = useStyles({
    direction: props.direction ?? "column",
    top: props.top ?? 1,
  });

  return (
    <div className={classes.floatingIcons}>
      {props.link && (
        <LinkIcon
          label={`View ${props.linkLabel}`}
          href={props.link}
          icon={<Launch />}
          className={classes.iconButton}
        />
      )}
      {props.github && (
        <LinkIcon
          label="View GitHub"
          href={props.github}
          icon={<GitHub />}
          className={classes.iconButton}
        />
      )}
    </div>
  );
};

export default FloatingIcons;
