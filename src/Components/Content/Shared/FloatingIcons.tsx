// React Imports
import React, { FC } from "react";
import LinkIcon from "../../Atomic/Icon/Link";

// Material UI Imports
import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { GitHub, Launch, LinkedIn } from "@mui/icons-material";

type Direction = "row" | "column";

interface StyleProps {
  direction: Direction;
  top: number | string;
  right: number | string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  floatingIcons: {
    display: "flex",
    flexDirection: ({ direction }) => direction,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: ({ top }) => (typeof top === "string" ? top : theme.spacing(top)),
    right: ({ right }) =>
      typeof right === "string" ? right : theme.spacing(right),
  },
  iconButton: {
    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(0.25),
    },
  },
}));

interface Icon {
  label: string;
  value: string;
  icon: JSX.Element;
}

interface FloatingIconsProps {
  linkLabel?: string;
  link?: string;
  github?: string;
  linkedin?: string;
  direction?: Direction;
  top?: number | string;
  right?: number | string;
  icons?: Icon[];
}

const FloatingIcons: FC<FloatingIconsProps> = (props) => {
  const classes = useStyles({
    direction: props.direction ?? "column",
    top: props.top ?? 1,
    right: props.right ?? 1,
  });

  return (
    <div className={classes.floatingIcons}>
      {props.link && (
        <LinkIcon
          label={`View ${props.linkLabel ?? "Link"}`}
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
      {props.linkedin && (
        <LinkIcon
          label="View LinkedIn"
          href={props.linkedin}
          icon={<LinkedIn />}
          className={classes.iconButton}
        />
      )}
      {props.icons &&
        props.icons.map((icon, i) => (
          <LinkIcon
            key={i}
            label={`View ${icon.label}`}
            href={icon.value}
            icon={icon.icon}
            className={classes.iconButton}
          />
        ))}
    </div>
  );
};

export default FloatingIcons;
