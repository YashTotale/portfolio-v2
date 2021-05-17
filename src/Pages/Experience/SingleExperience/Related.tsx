// React Imports
import React, { FC } from "react";
import { useArticles, useProjects } from "../../../Context/DataContext";

// Material UI Imports
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import Overlay from "../../../Components/Overlay";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: theme.spacing(-1),
  },
  heading: {
    margin: theme.spacing(1, 0),
  },
  overlay: {
    margin: theme.spacing(1),
  },
}));

interface RelatedProps {
  id: string;
}

const Related: FC<RelatedProps> = ({ id }) => {
  const classes = useStyles();
  const projects = useProjects();
  const articles = useArticles();

  if (projects === null || articles === null) return <CircularProgress />;

  const relatedProjects = projects.filter((p) => p.associated?.sys.id === id);
  const relatedArticles = articles.filter((a) => a.associated?.sys.id === id);

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
    </>
  );
};

export default Related;
