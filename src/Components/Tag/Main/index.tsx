// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import Title from "./Components/Title";
import Icon from "./Components/Icon";
import Related from "./Components/Related";
import HorizontalDivider from "../../Divider/Horizontal";
import ExperienceAssociated from "../../Experience/Associated";
import ProjectAssociated from "../../Project/Associated";
import ArticleAssociated from "../../Article/Associated";
import { getTag } from "../../../Utils/Content/tags";

// Material UI Imports
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  main: {
    padding: theme.spacing(0, 2),
    width: "100%",
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
    <Paper elevation={16} className={clsx(classes.root, props.className)}>
      <Title {...tag} search={props.search} />
      <Icon {...tag} />
      <HorizontalDivider />
      <div className={classes.main}>
        {!!tag.experience.length && (
          <Related label="Related Experience">
            {tag.experience.map((exp) => (
              <ExperienceAssociated
                key={exp.id}
                id={exp.id}
                search={props.search}
              />
            ))}
          </Related>
        )}
        {!!tag.projects.length && (
          <Related label="Related Projects">
            {tag.projects.map((project) => (
              <ProjectAssociated key={project.id} id={project.id} />
            ))}
          </Related>
        )}
        {!!tag.articles.length && (
          <Related label="Related Articles">
            {tag.articles.map((article) => (
              <ArticleAssociated key={article.id} id={article.id} />
            ))}
          </Related>
        )}
      </div>
    </Paper>
  );
};

export default Tag;
