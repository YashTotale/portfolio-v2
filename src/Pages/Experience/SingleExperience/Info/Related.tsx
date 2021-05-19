// React Imports
import React, { FC } from "react";
import Overlay from "../../../../Components/Overlay";
import TagChip from "../../../../Components/Tag/Chip";
import {
  useArticles,
  useProjects,
  useTags,
} from "../../../../Context/DataContext";
import { ExperienceFields } from "../../../../Utils/types";
import { getExperienceRelated } from "../../../../Utils/experience";

// Material UI Imports
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  spinner: {
    margin: theme.spacing(1, 0),

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1, "auto"),
    },
  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: theme.spacing(-1),
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  heading: {
    margin: theme.spacing(1, 0),
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  overlay: {
    margin: theme.spacing(1),
  },
}));

const Related: FC<ExperienceFields> = (props) => {
  const classes = useStyles();
  const projects = useProjects();
  const articles = useArticles();
  const allTags = useTags();

  if (projects === null || articles === null || allTags === null)
    return <CircularProgress className={classes.spinner} />;

  const {
    projects: relatedProjects,
    articles: relatedArticles,
    tags: relatedTags,
  } = getExperienceRelated(props, projects, articles, allTags);

  return (
    <>
      {!!relatedProjects.length && (
        <>
          <Typography variant="h5" className={classes.heading}>
            Projects
          </Typography>
          <div className={classes.container}>
            {relatedProjects.map((project) => (
              <Overlay
                label={project.title}
                icon={project.image}
                to={`/projects/${project.id}`}
                key={project.id}
                className={classes.overlay}
              />
            ))}
          </div>
        </>
      )}
      {!!relatedArticles.length && (
        <>
          <Typography variant="h5" className={classes.heading}>
            Articles
          </Typography>
          <div className={classes.container}>
            {relatedArticles.map((article) => (
              <Overlay
                label={article.title}
                icon={article.image}
                to={`/articles/${article.id}`}
                key={article.id}
                className={classes.overlay}
              />
            ))}
          </div>
        </>
      )}
      {!!relatedTags.length && (
        <>
          <Typography variant="h5" className={classes.heading}>
            Tags
          </Typography>
          <div className={classes.container}>
            {relatedTags.map((tag) => (
              <TagChip {...tag} key={tag.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Related;
