// React Imports
import React, { FC } from "react";
import { getImageTitle, getImageUrl } from "../../../API/helpers";
import { TagFields } from "../../../Utils/types";

// Material UI Imports
import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    width: "30%",
  },
  icon: {
    margin: theme.spacing(2),

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
}));

const Icon: FC<TagFields> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const isDark = theme.palette.type === "dark";
  const icon = isDark ? props.darkIcon : props.lightIcon;

  return (
    <div className={classes.iconContainer}>
      <img
        src={getImageUrl(icon)}
        alt={getImageTitle(icon)}
        className={classes.icon}
      />
    </div>
  );
};

export default Icon;
