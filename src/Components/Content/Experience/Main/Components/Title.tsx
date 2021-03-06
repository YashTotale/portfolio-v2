// React Imports
import React, { FC } from "react";
import FloatingIcons from "../../../Shared/FloatingIcons";
import { ResolvedExperience } from "../../../../../Utils/types";
import {
  generateExperienceSubtitle,
  generateExperienceTitle,
} from "../../../../../Utils/Content/experience";

// Material UI Imports
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    padding: theme.spacing(0, 18),

    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 2),
    },
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
    },
  },
  subtitle: {},
}));

type TitleProps = ResolvedExperience;

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={classes.titleContainer}>
      <Typography
        variant={isSizeSmall ? "h5" : "h4"}
        align="center"
        className={classes.title}
      >
        {generateExperienceTitle(props)}
      </Typography>
      <Typography
        variant={isSizeSmall ? "subtitle1" : "h6"}
        align="center"
        className={classes.subtitle}
      >
        {generateExperienceSubtitle(props)}
      </Typography>
      {!isSizeSmall && (
        <FloatingIcons
          link={props.link}
          github={props.github}
          linkedin={props.linkedin}
          linkLabel="Website"
          direction="row"
          top={0}
        />
      )}
    </div>
  );
};

export default Title;
