//React Imports
import React, { FC } from "react";
import { PROJECT_WIDTHS } from "./index";
import StyledLink from "../../StyledLink";

// Redux Imports
import { useSelector } from "react-redux";
import { getProjectsSearch } from "../../../Redux";

// Material UI Imports
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  projectTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    marginBottom: theme.spacing(1),

    [theme.breakpoints.only("xl")]: {
      width: PROJECT_WIDTHS.xl - theme.spacing(4),
    },

    [theme.breakpoints.only("lg")]: {
      width: PROJECT_WIDTHS.lg - theme.spacing(4),
    },

    [theme.breakpoints.only("md")]: {
      width: PROJECT_WIDTHS.md - theme.spacing(4),
    },

    [theme.breakpoints.only("sm")]: {
      width: PROJECT_WIDTHS.sm - theme.spacing(4),
    },

    [theme.breakpoints.only("xs")]: {
      width: PROJECT_WIDTHS.xs - theme.spacing(4),
    },
  },
}));

interface TitleProps {
  id: string;
  title: string;
}

const Title: FC<TitleProps> = (props) => {
  const { id, title } = props;
  const classes = useStyles();
  const theme = useTheme();
  const search = useSelector(getProjectsSearch);
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <StyledLink
      to={`/projects/${id}`}
      variant={isSizeXS ? "h5" : "h4"}
      className={classes.projectTitle}
      toMatch={search}
    >
      {title}
    </StyledLink>
  );
};

export default Title;
