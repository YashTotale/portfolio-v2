// React Imports
import React, { FC } from "react";
import Overlay from "../../Overlay";
import Associated from "../../Experience/Associated";
import HorizontalDivider from "../../Divider/Horizontal";
import { ResolvedTag } from "../../../Utils/types";
import { getAsset } from "../../../Utils/Content/assets";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
    width: "70%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      alignItems: "center",
    },
  },
  spinner: {
    margin: theme.spacing(1, "auto"),
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(2),
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      margin: theme.spacing(1, 0),
      padding: theme.spacing(0, 2),
    },
  },
  related: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: theme.spacing(-2),

    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      marginLeft: theme.spacing(0),
    },
  },
  experience: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: theme.spacing(-2),

    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      marginLeft: theme.spacing(0),
    },
  },
  associated: {
    margin: theme.spacing(1, 2),
  },
  overlay: {
    margin: theme.spacing(1, 2),
  },
}));

const Related: FC<ResolvedTag> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!!props.experience.length && (
        <div className={classes.container}>
          <Heading>Related Experience</Heading>
          <div className={classes.experience}>
            {props.experience.map((experience) => (
              <Associated
                id={experience.id}
                className={classes.associated}
                key={experience.id}
              />
            ))}
          </div>
        </div>
      )}
      {!!props.experience.length && !!props.projects.length && (
        <HorizontalDivider height={3} />
      )}
      {!!props.projects.length && (
        <div className={classes.container}>
          <Heading>Related Projects</Heading>
          <div className={classes.related}>
            {props.projects.map((project) => (
              <Overlay
                key={project.id}
                icon={getAsset(project.image)}
                label={project.title}
                to={`/projects/${project.id}`}
                className={classes.overlay}
              />
            ))}
          </div>
        </div>
      )}
      {(!!props.projects.length || !!props.experience.length) &&
        !!props.articles.length && <HorizontalDivider height={3} />}
      {!!props.articles.length && (
        <div className={classes.container}>
          <Heading>Related Articles</Heading>
          <div className={classes.related}>
            {props.articles.map((article) => (
              <Overlay
                key={article.id}
                icon={getAsset(article.image)}
                label={article.title}
                to={`/projects/${article.id}`}
                className={classes.overlay}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Heading: FC = ({ children }) => {
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Typography
      align={isSizeSmall ? "center" : "left"}
      variant={isSizeSmall ? "h6" : "h5"}
    >
      {children}
    </Typography>
  );
};

export default Related;
