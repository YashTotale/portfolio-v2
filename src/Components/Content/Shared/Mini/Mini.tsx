// React Imports
import React, { FC } from "react";
import { Asset } from "contentful";
import clsx from "clsx";
import { Link } from "react-router-dom";
import MatchHighlight from "../../../Atomic/MatchHighlight";

// Material UI Imports
import { Avatar, Typography, Button, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    maxWidth: "100%",
  },
  button: {
    padding: theme.spacing(1, 2),
    textTransform: "none",
    width: "100%",
    height: "100%",
    borderColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[600]
        : theme.palette.grey[400],
  },
  avatar: {
    padding: theme.spacing(0.5),
  },
  title: {
    marginLeft: theme.spacing(1),
    lineHeight: 1.4,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexGrow: 1,
  },
}));

interface Content {
  title: string;
  slug: string;
  image?: Asset["fields"];
  lightImage?: Asset["fields"];
  darkImage?: Asset["fields"];
}

export interface MiniProps {
  content: Content | null;
  pathFunc: (slug: string) => string;
  titleFunc?: (content: any) => string;
  search?: string;
  className?: string;
}

const Mini: FC<MiniProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (!props.content) return null;

  const label = props.titleFunc
    ? props.titleFunc(props.content)
    : props.content.title;
  const image =
    props.content.image ??
    (isDark ? props.content.darkImage : props.content.lightImage);

  return (
    <Link
      to={props.pathFunc(props.content.slug)}
      className={clsx(classes.link, props.className)}
      title={label}
    >
      <Button className={classes.button} color="inherit" variant="outlined">
        {image && (
          <Avatar
            alt={image.title}
            src={`${image.file.url}?h=40`}
            className={classes.avatar}
          />
        )}
        <Typography align="left" variant="subtitle1" className={classes.title}>
          <MatchHighlight toMatch={props.search}>{label}</MatchHighlight>
        </Typography>
      </Button>
    </Link>
  );
};

export default Mini;
