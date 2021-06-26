// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import MatchHighlight from "../../MatchHighlight";
import {
  generateExperienceTitle,
  getSingleExperience,
} from "../../../Utils/Content/experience";

// Material UI Imports
import { Avatar, makeStyles, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
    textTransform: "none",
  },
  avatar: {
    padding: theme.spacing(0.5),
  },
  title: {
    marginLeft: theme.spacing(0.5),
    lineHeight: 1.4,
  },
}));

export interface MiniProps {
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
      <Button className={classes.button} variant="outlined">
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
      </Button>
    </Link>
  );
};

export default Mini;
