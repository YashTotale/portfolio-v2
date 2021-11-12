//React Imports
import React, { FC } from "react";
import { Paths } from "../../../../Static/NavController";
import StyledLink from "../../../../Atomic/StyledLink";
import { ResolvedExperience } from "../../../../../Utils/types";
import {
  generateExperienceSubtitle,
  generateExperienceTitle,
} from "../../../../../Utils/Content/experience";

// Material UI Imports
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    width: "95%",
  },
  subtitle: {
    marginBottom: theme.spacing(1),
  },
}));

type TitleProps = ResolvedExperience & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <>
      <StyledLink
        to={Paths.SingleExperience(props.slug)}
        variant={isSizeXS ? "h5" : "h4"}
        className={classes.title}
        toMatch={props.search}
      >
        {generateExperienceTitle(props)}
      </StyledLink>
      <Typography
        variant={isSizeXS ? "subtitle2" : "subtitle1"}
        color="textSecondary"
        className={classes.subtitle}
      >
        {generateExperienceSubtitle(props)}
      </Typography>
    </>
  );
};

export default Title;
