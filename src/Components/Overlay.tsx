// React Imports
import React, { FC, useState } from "react";
import clsx from "clsx";
import { Link, LinkProps } from "react-router-dom";
import { Asset } from "contentful";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useTheme,
  Theme,
  useMediaQuery,
} from "@material-ui/core";

interface StyleProps {
  hovering: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifySelf: "center",
  },
  container: {
    [theme.breakpoints.only("xl")]: {
      width: 175,
      height: 175,
    },

    [theme.breakpoints.only("lg")]: {
      width: 150,
      height: 150,
    },

    [theme.breakpoints.only("md")]: {
      width: 150,
      height: 150,
    },

    [theme.breakpoints.only("sm")]: {
      width: 125,
      height: 125,
    },

    [theme.breakpoints.only("xs")]: {
      width: 100,
      height: 100,
    },
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifySelf: "center",
    position: "relative",
    border: `4px solid ${theme.palette.text.primary}`,
    borderRadius: "5px",
    padding: theme.spacing(1.5),
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#1d1c1c",
    visibility: ({ hovering }) => (hovering ? "visible" : "hidden"),
    opacity: ({ hovering }) => (hovering ? 0.75 : 0),
    transition: theme.transitions.create(["visibility", "opacity"], {
      duration: "0.4s",
    }),
  },
  title: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    color: theme.palette.common.white,
    fontWeight: 900,
    visibility: ({ hovering }) => (hovering ? "visible" : "hidden"),
    opacity: ({ hovering }) => (hovering ? 1 : 0),
    transition: theme.transitions.create(["visibility", "opacity"], {
      duration: "0.4s",
    }),
    // Clipping
    maxHeight: `calc(100% - ${theme.spacing(2)}px)`,
    maxWidth: `calc(100% - ${theme.spacing(2)}px)`,
    textOverflow: "ellipsis",
    overflowX: "hidden",
    overflowY: "scroll",
  },
  icon: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  titleXS: {
    width: 100,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    marginTop: theme.spacing(0.5),
  },
}));

interface OverlayProps {
  label: string;
  to: LinkProps["to"];
  icon: Asset["fields"];
  className?: string;
}

const Overlay: FC<OverlayProps> = ({ label, to, icon, className }) => {
  const [hovering, setHovering] = useState(false);
  const theme = useTheme();
  const classes = useStyles({ hovering });
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <div className={clsx(classes.root, className)}>
      <div
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={classes.container}
      >
        <Link to={to} className={classes.link}>
          <div className={classes.overlay}></div>
          <Typography variant="h6" align="center" className={classes.title}>
            {label}
          </Typography>
          <img
            src={`${icon.file.url}?w=175`}
            alt={icon.title}
            className={classes.icon}
          />
        </Link>
      </div>
      {isSizeXS && (
        <Typography variant="body1" align="center" className={classes.titleXS}>
          {label}
        </Typography>
      )}
    </div>
  );
};

export default Overlay;
