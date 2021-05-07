// React Imports
import React, { FC, useState } from "react";
import { getImageTitle, getImageUrl } from "../../API/helpers";
import { ProjectFields, TagFields } from "../../Utils/types";

// Material UI Imports
import { makeStyles, Typography, useTheme, Theme } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  projectTags: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: theme.spacing(1, 0),
  },
  heading: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  tagsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

const Tags: FC<ProjectFields> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.projectTags}>
      <Typography variant="h4" align="center" className={classes.heading}>
        Technologies Used
      </Typography>
      <div className={classes.tagsContainer}>
        {props.tags.map((tag, i) => (
          <Tag key={i} {...tag.fields} id={tag.sys.id} />
        ))}
      </div>
    </div>
  );
};

interface StyleProps {
  hovering: boolean;
}

const useTagStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifySelf: "center",
  },
  link: {
    position: "relative",
    border: `4px solid ${
      theme.palette.common[theme.palette.type === "dark" ? "white" : "black"]
    }`,
    borderRadius: "5px",
    margin: theme.spacing(1, 2),
    padding: theme.spacing(1),

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
  },
  icon: {
    width: "100%",
    height: "100%",
  },
}));

type TagProps = TagFields & {
  id: string;
};

const Tag: FC<TagProps> = (props) => {
  const [hovering, setHovering] = useState(false);
  const theme = useTheme();
  const classes = useTagStyles({ hovering });

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
    </div>
  );
};

export default Tags;
