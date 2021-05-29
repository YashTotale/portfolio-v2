// React Imports
import React, { FC } from "react";
import Overlay from "../../../Components/Overlay";
import Associated from "../../../Components/Experience/Associated";
import HorizontalDivider from "../../../Components/Divider/Horizontal";
import {
  useArticles,
  useExperience,
  useProjects,
} from "../../../Context/DataContext";
import { getTagRelated } from "../../../Utils/tags";
import { TagFields } from "../../../Utils/types";

// Material UI Imports
import {
  CircularProgress,
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
  associated: {
    margin: theme.spacing(1, 2),
  },
  overlay: {
    margin: theme.spacing(1, 2),
  },
}));

const Related: FC<TagFields> = (props) => {
  const classes = useStyles();
  const experience = useExperience();
  const projects = useProjects();
  const articles = useArticles();

  if (experience === null || projects === null || articles === null)
    return <CircularProgress />;

  const { relatedExperience, relatedProjects, relatedArticles } = getTagRelated(
    props,
    experience,
    projects,
    articles
  );

  return (
    <div className={classes.root}>
      {!!relatedExperience.length && (
        <div className={classes.container}>
          <Heading>Related Experience</Heading>
          <div className={classes.related}>
            {relatedExperience.map((experience) => (
              <Associated
                {...experience}
                className={classes.associated}
                key={experience.id}
              />
            ))}
          </div>
        </div>
      )}
      {!!relatedExperience.length && !!relatedProjects.length && (
        <HorizontalDivider height={3} />
      )}
      {!!relatedProjects.length && (
        <div className={classes.container}>
          <Heading>Related Projects</Heading>
          <div className={classes.related}>
            {relatedProjects.map((project) => (
              <Overlay
                key={project.id}
                icon={project.image}
                label={project.title}
                to={`/projects/${project.id}`}
                className={classes.overlay}
              />
            ))}
          </div>
        </div>
      )}
      {(!!relatedProjects.length || !!relatedExperience.length) &&
        !!relatedArticles.length && <HorizontalDivider height={3} />}
      {!!relatedArticles.length && (
        <div className={classes.container}>
          <Heading>Related Articles</Heading>
          <div className={classes.related}>
            {relatedArticles.map((article) => (
              <Overlay
                key={article.id}
                icon={article.image}
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
