// React Imports
import React, { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { LocationDescriptor } from "history";

// Material UI Imports
import {
  Button,
  capitalize,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

type BtnType = "previous" | "next";

interface StyleProps {
  type: BtnType;
  maxWidth: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    maxWidth: ({ maxWidth }) => maxWidth,
    marginRight: ({ type }) => (type === "previous" ? "auto" : 0),
    marginLeft: ({ type }) => (type === "next" ? "auto" : 0),
    paddingRight: ({ type }) => (type === "previous" ? theme.spacing(1) : 0),
    paddingLeft: ({ type }) => (type === "next" ? theme.spacing(1) : 0),
  },
  button: {
    width: "100%",
    textTransform: "none",
    padding: theme.spacing(1, 2),
  },
  label: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: ({ type }) => (type === "previous" ? "flex-start" : "flex-end"),
    marginRight: ({ type }) => (type === "previous" ? "auto" : 0),
    marginLeft: ({ type }) => (type === "next" ? "auto" : 0),
  },
  labelText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  },
}));

export interface NavButtonProps {
  label: string;
  to: LocationDescriptor;
  type: BtnType;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  maxWidth?: string;
  typeLabel?: string;
  className?: string;
}

const NavButton: FC<NavButtonProps> = (props) => {
  const classes = useStyles({
    type: props.type,
    maxWidth: props.maxWidth ?? "50%",
  });
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const label =
    props.type === "previous" ? `« ${props.label}` : `${props.label} »`;

  return (
    <Link
      to={props.to}
      className={clsx(classes.link, props.className)}
      onClick={props?.onClick}
    >
      <Button color="primary" className={classes.button}>
        <div className={classes.label}>
          <Typography
            color="textSecondary"
            variant={isSizeXS ? "caption" : "body1"}
          >
            {props.typeLabel ?? capitalize(props.type)}
          </Typography>
          <Typography
            color="primary"
            variant={isSizeXS ? "body1" : "h6"}
            className={classes.labelText}
          >
            {label}
          </Typography>
        </div>
      </Button>
    </Link>
  );
};

export default NavButton;
