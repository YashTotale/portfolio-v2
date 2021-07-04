//React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import StyledLink from "../../../../StyledLink";
import { useTitle } from "../../../../../Context/HeadContext";
import { ResolvedExperience } from "../../../../../Utils/types";
import { generateSearch } from "../../../../../Utils/funcs";
import {
  generateExperienceSubtitle,
  generateExperienceTitle,
} from "../../../../../Utils/Content/experience";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    width: "95%",

    [theme.breakpoints.up("xs")]: {
      fontSize: "2rem",
    },
  },
  subtitle: {
    marginBottom: theme.spacing(1),
  },
}));

type TitleProps = ResolvedExperience & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const { slug, search } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const location = useLocation();
  const pageTitle = useTitle();

  return (
    <>
      <StyledLink
        to={{
          pathname: `/experience/${slug}`,
          search: generateSearch(
            {
              from_path: location.pathname,
              from_type: "preview_title",
            },
            pageTitle
          ),
        }}
        variant={isSizeXS ? "h5" : "h4"}
        className={classes.title}
        toMatch={search}
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
