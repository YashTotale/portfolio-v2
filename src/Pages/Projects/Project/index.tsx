//React Imports
import React, { FC, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import FloatingIcons from "./FloatingIcons";
import Tag from "./Tag";
import { Matches } from "../Filters";
import Info from "../../../Components/Project/Info";
import { getImageTitle, getImageUrl } from "../../../API/helpers";
import { ProjectFields } from "../../../Utils/types";

//Material UI Imports
import {
  Divider,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const projectWidths = {
  xl: 550,
  lg: 472,
  md: 432,
  sm: 450,
  xs: 300,
};

interface StyleProps {
  pushLeft: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  project: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2),

    [theme.breakpoints.only("xl")]: {
      width: projectWidths.xl,
      marginRight: ({ pushLeft }) =>
        pushLeft ? projectWidths.xl + 3 * theme.spacing(2) : theme.spacing(2),
    },

    [theme.breakpoints.only("lg")]: {
      width: projectWidths.lg,
      marginRight: ({ pushLeft }) =>
        pushLeft ? projectWidths.lg + 3 * theme.spacing(2) : theme.spacing(2),
    },

    [theme.breakpoints.only("md")]: {
      width: projectWidths.md,
      marginRight: ({ pushLeft }) =>
        pushLeft ? projectWidths.md + 3 * theme.spacing(2) : theme.spacing(2),
    },

    [theme.breakpoints.only("sm")]: {
      width: projectWidths.sm,
    },

    [theme.breakpoints.only("xs")]: {
      width: projectWidths.xs,
    },
  },
  projectTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  projectImage: {
    margin: theme.spacing(2, 0),

    [theme.breakpoints.only("xl")]: {
      width: 200,
    },

    [theme.breakpoints.only("lg")]: {
      width: 175,
    },

    [theme.breakpoints.only("md")]: {
      width: 175,
    },

    [theme.breakpoints.only("sm")]: {
      width: 150,
    },

    [theme.breakpoints.only("xs")]: {
      width: 125,
    },
  },
  projectTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    marginBottom: theme.spacing(1),

    [theme.breakpoints.only("xl")]: {
      width: projectWidths.xl - theme.spacing(4),
    },

    [theme.breakpoints.only("lg")]: {
      width: projectWidths.lg - theme.spacing(4),
    },

    [theme.breakpoints.only("md")]: {
      width: projectWidths.md - theme.spacing(4),
    },

    [theme.breakpoints.only("sm")]: {
      width: projectWidths.sm - theme.spacing(4),
    },

    [theme.breakpoints.only("xs")]: {
      width: projectWidths.xs - theme.spacing(4),
    },
  },
  projectDivider: {
    height: "1px",
  },
  projectTags: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(1),
  },
  projectTimeline: {
    margin: theme.spacing(1, 0),
  },
}));

type ProjectProps = ProjectFields & {
  id: string;
  pushLeft?: boolean;
  matches: Matches[keyof Matches] | undefined;
};

const Project: FC<ProjectProps> = (props) => {
  const {
    id,
    title,
    image,
    tags,
    start,
    end,
    matches,
    pushLeft = false,
  } = props;
  const classes = useStyles({ pushLeft });
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Paper className={classes.project} elevation={12}>
      <Paper className={classes.projectTop} elevation={3}>
        <FloatingIcons {...props} />
        <img
          src={getImageUrl(image)}
          alt={getImageTitle(image)}
          className={classes.projectImage}
        />
        <Link component={RouterLink} to={`/projects/${id}`}>
          <Typography
            variant={isSizeXS ? "h5" : "h4"}
            color="primary"
            className={classes.projectTitle}
          >
            <MarkedTitle title={title} matches={matches} />
          </Typography>
        </Link>
      </Paper>
      <Info {...props} />
      <Divider flexItem className={classes.projectDivider} />
      <div className={classes.projectTags}>
        {tags.map((tag) => (
          <Tag key={tag.sys.id} id={tag.sys.id} {...tag.fields} />
        ))}
      </div>
      <Divider flexItem className={classes.projectDivider} />
      <Typography
        className={classes.projectTimeline}
        variant={isSizeXS ? "body2" : "body1"}
      >
        {start} - {end}
      </Typography>
    </Paper>
  );
};

interface MarkedTitleProps {
  title: string;
  matches: ProjectProps["matches"];
}

const MarkedTitle: FC<MarkedTitleProps> = ({ title, matches }) => {
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

export default Project;
