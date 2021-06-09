// React Imports
import React, { FC } from "react";
import Overlay from "../../../Overlay";
import TagChip from "../../../Tag/Chip";
import { ResolvedExperience } from "../../../../Utils/types";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";
import { getAsset } from "../../../../Utils/Content/assets";

const useStyles = makeStyles((theme) => ({
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

const Related: FC<ResolvedExperience> = (props) => {
  const classes = useStyles();

  return (
    <>
      {!!props.projects.length && (
        <>
          <Typography variant="h5" className={classes.heading}>
            Projects
          </Typography>
          <div className={classes.container}>
            {props.projects.map((project) => (
              <Overlay
                label={project.title}
                icon={getAsset(project.image)}
                to={`/projects/${project.id}`}
                key={project.id}
                className={classes.overlay}
              />
            ))}
          </div>
        </>
      )}
      {!!props.articles.length && (
        <>
          <Typography variant="h5" className={classes.heading}>
            Articles
          </Typography>
          <div className={classes.container}>
            {props.articles.map((article) => (
              <Overlay
                label={article.title}
                icon={getAsset(article.image)}
                to={`/articles/${article.id}`}
                key={article.id}
                className={classes.overlay}
              />
            ))}
          </div>
        </>
      )}
      {!!props.tags.length && (
        <>
          <Typography variant="h5" className={classes.heading}>
            Tags
          </Typography>
          <div className={classes.container}>
            {props.tags.map((tag) => (
              <TagChip id={tag.id} key={tag.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Related;
