// React Imports
import React, { FC } from "react";
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
import { Link } from "react-router-dom";
import clsx from "clsx";

type BtnType = "previous" | "next";

interface StyleProps {
  type: BtnType;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    flex: 1,
    maxWidth: "50%",
    marginRight: ({ type }) => (type === "previous" ? "auto" : 0),
    marginLeft: ({ type }) => (type === "next" ? "auto" : 0),
    paddingRight: ({ type }) => (type === "previous" ? theme.spacing(1) : 0),
    paddingLeft: ({ type }) => (type === "next" ? theme.spacing(1) : 0),
  },
  button: {
    width: "100%",
    textTransform: "none",
    border: `1px solid ${theme.palette.text.primary}`,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
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

interface NavButtonProps {
  label: string;
  to: LocationDescriptor;
  type: BtnType;
  typeLabel?: string;
  className?: string;
}

const NavButton: FC<NavButtonProps> = (props) => {
  const classes = useStyles({ type: props.type });
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const label =
    props.type === "previous" ? `« ${props.label}` : `${props.label} »`;

  return (
    <Link to={props.to} className={clsx(classes.link, props.className)}>
      <Button variant="outlined" className={classes.button}>
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