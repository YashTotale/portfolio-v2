// React Imports
import React, { FC } from "react";
import Overlay from "../../../Overlay";
import TagChip from "../../../Tag/Mini";
import ProjectAssociated from "../../../Project/Associated";
import { ResolvedExperience } from "../../../../Utils/types";
import { getAsset } from "../../../../Utils/Content/assets";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

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
  associated: {
    margin: theme.spacing(1),
    width: "100%",
  },
  overlay: {
    margin: theme.spacing(1),
  },
}));

type RelatedProps = ResolvedExperience & {
  search?: string;
};

const Related: FC<RelatedProps> = (props) => {
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
              <ProjectAssociated
                id={project.id}
                key={project.id}
                className={classes.associated}
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
                to={`/articles/${article.slug}`}
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
