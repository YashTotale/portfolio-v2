// React Imports
import React, { FC } from "react";
import DynamicImage from "../../../../Atomic/DynamicImage";
import { ResolvedTag } from "../../../../../Utils/types";

// Material UI Imports
import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

type IconProps = ResolvedTag;

const Icon: FC<IconProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const isDark = theme.palette.type === "dark";
  const icon = isDark ? props.darkIcon : props.lightIcon;

  return (
    <DynamicImage
      src={`${icon.file.url}?w=175`}
      alt={icon.title}
      className={classes.icon}
    />
  );
};

export default Icon;
