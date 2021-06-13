// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  generateExperienceTitle,
  getSingleExperience,
} from "../../Utils/Content/experience";

// Material UI Imports
import {
  darken,
  lighten,
  Avatar,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MatchHighlight from "../MatchHighlight";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    padding: theme.spacing(1),
    transition: theme.transitions.create("background-color", {
      duration: "0.3s",
    }),
    "&:hover": {
      backgroundColor: (theme.palette.type === "dark" ? lighten : darken)(
        theme.palette.background.paper,
        0.1
      ),
    },
  },
  avatar: {
    padding: theme.spacing(0.5),
  },
  title: {
    marginLeft: theme.spacing(0.5),
    lineHeight: 1.4,
  },
}));

interface MiniProps {
  id: string;
  search?: string;
  className?: string;
}

const Mini: FC<MiniProps> = (props) => {
  const classes = useStyles();
  const experience = getSingleExperience(props.id);

  if (!experience) return null;

  return (
    <Link
      to={`/experience/${experience.id}`}
      className={clsx(classes.link, props.className)}
    >
      <div className={classes.container}>
        <Avatar
          alt={experience.image.title}
          src={experience.image.file.url}
          className={classes.avatar}
        />
        <Typography variant="subtitle1" className={classes.title}>
          <MatchHighlight toMatch={props.search}>
            {generateExperienceTitle(experience)}
          </MatchHighlight>
        </Typography>
      </div>
    </Link>
  );
};

export default Mini;
