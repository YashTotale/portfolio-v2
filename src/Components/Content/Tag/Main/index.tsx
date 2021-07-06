// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import Title from "./Components/Title";
import Icon from "./Components/Icon";
import ExperienceOverlay from "../../Experience/Overlay";
import ProjectOverlay from "../../Project/Overlay";
import ArticleOverlay from "../../Article/Overlay";
import MainContainer from "../../Shared/MainContainer";
import { getTag } from "../../../../Utils/Content/tags";

// Material UI Imports
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
    padding: theme.spacing(1, 0),
  },
  main: {
    padding: theme.spacing(0, 2),
    width: "100%",
  },
  associated: {
    margin: theme.spacing(2, 0),
    width: "100%",
  },
  overlay: {
    margin: theme.spacing(1, 2),
  },
}));

interface TagProps {
  id: string;
  search?: string;
  className?: string;
}

const Tag: FC<TagProps> = (props) => {
  const classes = useStyles();

  const tag = getTag(props.id);
  if (!tag) return null;

  return (
    <Paper elevation={8} className={clsx(classes.root, props.className)}>
      <Title {...tag} search={props.search} />
      <Icon {...tag} />
      <div className={classes.main}>
        {!!tag.experience.length && (
          <MainContainer title="Related Experience" direction="row">
            {tag.experience.map((exp) => (
              <ExperienceOverlay
                key={exp.id}
                id={exp.id}
                className={classes.overlay}
              />
            ))}
          </MainContainer>
        )}
        {!!tag.projects.length && (
          <MainContainer title="Related Projects" direction="row">
            {tag.projects.map((project) => (
              <ProjectOverlay
                key={project.id}
                id={project.id}
                className={classes.overlay}
              />
            ))}
          </MainContainer>
        )}
        {!!tag.articles.length && (
          <MainContainer title="Related Articles" direction="row">
            {tag.articles.map((article) => (
              <ArticleOverlay
                key={article.id}
                id={article.id}
                className={classes.overlay}
              />
            ))}
          </MainContainer>
        )}
      </div>
    </Paper>
  );
};

export default Tag;
