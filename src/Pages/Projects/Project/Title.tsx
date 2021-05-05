//React Imports
import React, { FC, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PROJECT_WIDTHS, ProjectProps } from "./index";

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
  const { id } = props;
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
        <MarkedTitle {...props} />
      </Typography>
    </Link>
  );
};

const MarkedTitle: FC<TitleProps> = ({ title, matches }) => {
  if (!matches) return <>{title}</>;

  const titleMatch = matches.find((match) => match.key === "title");

  if (!titleMatch) return <>{title}</>;

  const parsed: (JSX.Element | string)[] = [];

  for (let i = 0; i < title.length; i++) {
    const isMarked = titleMatch.indices?.find((index) => index[0] === i);

    if (!isMarked) {
      const char = title.substring(i, i + 1);
      const lastElement = parsed[parsed.length - 1];

      if (typeof lastElement === "string") {
        parsed[parsed.length - 1] = parsed[parsed.length - 1] + char;
      } else {
        parsed.push(char);
      }

      continue;
    }

    parsed.push(<mark>{title.substring(isMarked[0], isMarked[1] + 1)}</mark>);
    i += isMarked[1] - isMarked[0];
  }

  return (
    <>
      {parsed.map((el, i) => (
        <Fragment key={i}>{el}</Fragment>
      ))}
    </>
  );
};

export default Title;
