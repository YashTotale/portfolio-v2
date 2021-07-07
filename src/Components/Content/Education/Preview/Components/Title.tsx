//React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import StyledLink from "../../../../Atomic/StyledLink";
import { useTitle } from "../../../../../Context/HeadContext";
import { ResolvedEducation } from "../../../../../Utils/types";
import { generateSearch } from "../../../../../Utils/funcs";

// Material UI Imports
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    width: "95%",
    margin: theme.spacing(1),

    [theme.breakpoints.up("xs")]: {
      fontSize: "2rem",
    },
  },
}));

type TitleProps = ResolvedEducation & {
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
          pathname: `/education/${slug}`,
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
        {props.title}
      </StyledLink>
    </>
  );
};

export default Title;
