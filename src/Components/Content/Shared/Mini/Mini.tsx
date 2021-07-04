// React Imports
import React, { FC } from "react";
import { Asset } from "contentful";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import MatchHighlight from "../../../MatchHighlight";
import { useTitle } from "../../../../Context/HeadContext";
import { generateSearch } from "../../../../Utils/funcs";

// Material UI Imports
import { Avatar, makeStyles, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  button: {
    padding: theme.spacing(1, 2),
    textTransform: "none",
    width: "100%",
    height: "100%",
  },
  label: {
    display: "flex",
    justifyContent: "flex-start",
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
  },
}));

interface Content {
  title: string;
  slug: string;
  image: Asset["fields"];
}

export interface MiniProps {
  content: Content | null;
  basePath: string;
  titleFunc?: (content: any) => string;
  search?: string;
  className?: string;
}

const Mini: FC<MiniProps> = (props) => {
  const classes = useStyles();

  const location = useLocation();
  const title = useTitle();

  if (!props.content) return null;

  return (
    <Link
      to={{
        pathname: `/${props.basePath}/${props.content.slug}`,
        search: generateSearch(
          {
            from_path: location.pathname,
            from_type: "mini",
          },
          title
        ),
      }}
      className={clsx(classes.link, props.className)}
    >
      <Button
        className={classes.button}
        classes={{
          label: classes.label,
        }}
        variant="outlined"
      >
        <Avatar
          alt={props.content.image.title}
          src={props.content.image.file.url}
          className={classes.avatar}
        />
        <Typography variant="subtitle1" className={classes.title}>
          <MatchHighlight toMatch={props.search}>
            {props.titleFunc
              ? props.titleFunc(props.content)
              : props.content.title}
          </MatchHighlight>
        </Typography>
      </Button>
    </Link>
  );
};

export default Mini;
