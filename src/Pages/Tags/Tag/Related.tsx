// React Imports
import React, { FC } from "react";
import Overlay from "../../../Components/Overlay";
import HorizontalDivider from "../../../Components/Divider/Horizontal";
import {
  useArticles,
  useExperience,
  useProjects,
} from "../../../Context/DataContext";
import { TagFields } from "../../../Utils/types";

// Material UI Imports
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import { getExperienceRelated } from "../../../Utils/experience";
import Associated from "../../../Components/Experience/Associated";

const useStyles = makeStyles((theme) => ({
  tagRelated: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "100%",
    width: "70%",
  },
  container: {
    margin: theme.spacing(1, 2),
  },
  heading: {},
  related: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft: theme.spacing(-2),
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

  const relatedProjects = projects.filter((p) =>
    p.tags.some((tag) => tag.sys.id === props.id)
  );
  const relatedArticles = articles.filter((a) =>
    a.tags.some((tag) => tag.sys.id === props.id)
  );

  const relatedExperience = experience.filter((exp) => {
    const { tags } = getExperienceRelated(
      exp,
      relatedProjects,
      relatedArticles,
      [props]
    );

    return tags.some((tag) => tag.id === props.id);
  });

  return (
    <div className={classes.tagRelated}>
      {!!relatedExperience.length && (
        <div className={classes.container}>
          <Typography variant="h5" className={classes.heading}>
            Related Experience
          </Typography>
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
          <Typography variant="h5" className={classes.heading}>
            Related Projects
          </Typography>
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
          <Typography variant="h5" className={classes.heading}>
            Related Articles
          </Typography>
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

export default Related;
