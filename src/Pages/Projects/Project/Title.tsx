//React Imports
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PROJECT_WIDTHS, ProjectProps } from "./index";
import MatchHighlight from "../../../Components/MatchHighlight";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
} from "@material-ui/core";

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
  matches: ProjectProps["matches"];
}

const Title: FC<TitleProps> = (props) => {
  const { id, title, matches } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Link component={RouterLink} to={`/projects/${id}`}>
      <Typography
        variant={isSizeXS ? "h5" : "h4"}
        color="primary"
        className={classes.projectTitle}
      >
        <MatchHighlight matches={matches} keyToMatch="title">
          {title}
        </MatchHighlight>
      </Typography>
    </Link>
  );
};

export default Title;
