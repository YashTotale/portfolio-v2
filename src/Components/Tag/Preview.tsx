// React Imports
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { getImageTitle, getImageUrl } from "../../API/helpers";
import { TagFields } from "../../Utils/types";

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
    margin: theme.spacing(1, 2),

    [theme.breakpoints.only("xl")]: {
      width: 175,
    },

    [theme.breakpoints.only("lg")]: {
      width: 150,
    },

    [theme.breakpoints.only("md")]: {
      width: 150,
    },

    [theme.breakpoints.only("sm")]: {
      width: 125,
    },

    [theme.breakpoints.only("xs")]: {
      width: 100,
    },
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifySelf: "center",
    position: "relative",
    border: `4px solid ${
      theme.palette.common[theme.palette.type === "dark" ? "white" : "black"]
    }`,
    borderRadius: "5px",
    padding: theme.spacing(1),
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#1d1c1c",
    visibility: ({ hovering }) => (hovering ? "visible" : "hidden"),
    opacity: ({ hovering }) => (hovering ? 0.7 : 0),
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
  },
  titleXS: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
  },
}));

const TagPreview: FC<TagFields> = (props) => {
  const [hovering, setHovering] = useState(false);
  const theme = useTheme();
  const classes = useStyles({ hovering });
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const isDark = theme.palette.type === "dark";
  const icon = isDark ? props.darkIcon : props.lightIcon;

  return (
    <div
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={classes.root}
    >
      <Link to={`/tags/${props.id}`} className={classes.link}>
        <div className={classes.overlay}></div>
        <Typography variant="h5" align="center" className={classes.title}>
          {props.title}
        </Typography>
        <img
          src={getImageUrl(icon)}
          alt={getImageTitle(icon)}
          className={classes.icon}
        />
      </Link>
      {isSizeXS && (
        <Typography variant="body1" align="center" className={classes.titleXS}>
          {props.title}
        </Typography>
      )}
    </div>
  );
};

export default TagPreview;
