//React Imports
import React, { FC } from "react";
import FloatingIcons from "./FloatingIcons";
import Tag from "./Tag";
import Title from "./Title";
import { Matches } from "../Filters";
import Info from "../../../Components/Project/Info";
import { getImageTitle, getImageUrl } from "../../../API/helpers";
import { ProjectFields } from "../../../Utils/types";

//Material UI Imports
import {
  Divider,
  makeStyles,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

export const PROJECT_WIDTHS = {
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
      width: PROJECT_WIDTHS.xl,
      marginRight: ({ pushLeft }) =>
        pushLeft ? PROJECT_WIDTHS.xl + 3 * theme.spacing(2) : theme.spacing(2),
    },

    [theme.breakpoints.only("lg")]: {
      width: PROJECT_WIDTHS.lg,
      marginRight: ({ pushLeft }) =>
        pushLeft ? PROJECT_WIDTHS.lg + 3 * theme.spacing(2) : theme.spacing(2),
    },

    [theme.breakpoints.only("md")]: {
      width: PROJECT_WIDTHS.md,
      marginRight: ({ pushLeft }) =>
        pushLeft ? PROJECT_WIDTHS.md + 3 * theme.spacing(2) : theme.spacing(2),
    },

    [theme.breakpoints.only("sm")]: {
      width: PROJECT_WIDTHS.sm,
    },

    [theme.breakpoints.only("xs")]: {
      width: PROJECT_WIDTHS.xs,
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

export type ProjectProps = ProjectFields & {
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
        <Title title={title} matches={matches} id={id} />
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

export default Project;
