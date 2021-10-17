// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import Title from "./Components/Title";
import Icon from "./Components/Icon";
import Description from "./Components/Description";
import Categories from "../Shared/Categories";
import ExperienceOverlay from "../../Experience/Overlay";
import EducationOverlay from "../../Education/Overlay";
import ProjectOverlay from "../../Project/Overlay";
import ArticleOverlay from "../../Article/Overlay";
import CertificationOverlay from "../../Certification/Overlay";
import MainContainer from "../../Shared/MainContainer";
import { getTag } from "../../../../Utils/Content/tags";

// Material UI Imports
import { Paper } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

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
      <Categories {...tag} search={props.search} />
      <Icon {...tag} />
      <Description {...tag} search={props.search} />
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
        {!!tag.education.length && (
          <MainContainer title="Related Education" direction="row">
            {tag.education.map((ed) => (
              <EducationOverlay
                key={ed.id}
                id={ed.id}
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
        {!!tag.certification.length && (
          <MainContainer title="Related Certifications" direction="row">
            {tag.certification.map((cert) => (
              <CertificationOverlay
                key={cert.id}
                id={cert.id}
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
