// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { getImageTitle, getImageUrl } from "../../API/helpers";
import { ExperienceFields } from "../../Utils/types";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: "5px",
  },
  image: {
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
}));

type AssociatedProps = ExperienceFields & {
  className?: string;
};

const Associated: FC<AssociatedProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.container, props.className)}>
      <img
        src={getImageUrl(props.image)}
        alt={getImageTitle(props.image)}
        className={classes.image}
      />
    </div>
  );
};

export default Associated;
