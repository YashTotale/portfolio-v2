//React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import StyledLink from "../../../../StyledLink";
import { useTitle } from "../../../../../Context/HeadContext";
import { ResolvedExperience } from "../../../../../Utils/types";
import { generateSearch } from "../../../../../Utils/funcs";
import { generateExperienceTitle } from "../../../../../Utils/Content/experience";

// Material UI Imports
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    marginBottom: theme.spacing(1),
    width: "95%",
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
  );
};

export default Title;
