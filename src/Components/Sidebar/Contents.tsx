// React Imports
import React, { FC } from "react";
import Category from "./Category";
import Item from "./Item";
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

// Material UI Imports
import { Divider, List, makeStyles, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  const projects = useProjects();
  const articles = useArticles();
  const tags = useTags();

  const categories: CategoryInfo[] = [
    { label: "Experience", to: "experience", objects: experience },
    { label: "Projects", to: "projects", objects: projects },
    { label: "Articles", to: "articles", objects: articles },
    { label: "Tags", to: "tags", objects: tags },
  ];

  return (
    <>
      <Toolbar />
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
