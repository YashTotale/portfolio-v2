// React Imports
import React, { FC } from "react";
import Category from "./Category";
import Item from "./Item";
import { sortExperience } from "../../Pages/Experience/Contents";
import { sortProjects } from "../../Pages/Projects";
import { SIDEBAR_WIDTH } from "../../Utils/constants";
import {
  ArticleFields,
  ExperienceFields,
  ProjectFields,
  TagFields,
} from "../../Utils/types";
import {
  useArticles,
  useExperience,
  useProjects,
  useTags,
} from "../../Context/DataContext";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceSort, getProjectsSort } from "../../Redux";

// Material UI Imports
import { Divider, List, makeStyles, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "center",
  },
  list: {
    width: SIDEBAR_WIDTH,
  },
}));

interface CategoryInfo {
  label: string;
  to: string;
  objects:
    | (ExperienceFields | ProjectFields | ArticleFields | TagFields)[]
    | null;
}

const Contents: FC = () => {
  const classes = useStyles();

  const experience = useExperience();
  const experienceSort = useSelector(getExperienceSort);
  const sortedExperience =
    experience === null
      ? null
      : sortExperience(experienceSort, [...experience]);

  const projects = useProjects();
  const projectsSort = useSelector(getProjectsSort);
  const sortedProjects =
    projects === null ? null : sortProjects(projectsSort, [...projects]);

  const articles = useArticles();
  const tags = useTags();

  const categories: CategoryInfo[] = [
    { label: "Experience", to: "experience", objects: sortedExperience },
    { label: "Projects", to: "projects", objects: sortedProjects },
    { label: "Articles", to: "articles", objects: articles },
    { label: "Tags", to: "tags", objects: tags },
  ];

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <img src="/logo192.png" alt="Website Logo" height={40} />
      </Toolbar>
      <Divider />
      <List disablePadding className={classes.list}>
        <Category label="Home" to="/" withChildren={false} />
        {categories.map((category, i) => {
          const { label, to, objects } = category;

          return (
            <Category key={i} label={label} to={`/${to}`}>
              {objects === null
                ? null
                : objects.map((fields) => (
                    <Item
                      key={fields.id}
                      label={fields.title}
                      to={`/${to}/${fields.id}`}
                    />
                  ))}
            </Category>
          );
        })}
      </List>
    </>
  );
};

export default Contents;
