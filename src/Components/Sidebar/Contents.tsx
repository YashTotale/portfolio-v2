// React Imports
import React, { FC } from "react";
import Category from "./Category";
import Item from "./Item";
import { useSortedExperience } from "../../Utils/Content/experience";
import { useSortedProjects } from "../../Utils/Content/projects";
import { useSortedTags } from "../../Utils/Content/tags";
import { SIDEBAR_WIDTH } from "../../Utils/constants";
import { Experience, Article, Project, Tag } from "../../Utils/types";

// Material UI Imports
import { Divider, List, makeStyles, Toolbar } from "@material-ui/core";
import { getArticles } from "../../Utils/Content/articles";

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
  objects: (Experience | Project | Article | Tag)[];
  onClick?: (id: string) => void;
}

const Contents: FC = () => {
  const classes = useStyles();

  const experience = useSortedExperience();
  const projects = useSortedProjects();
  const articles = getArticles();
  const tags = useSortedTags();

  const categories: CategoryInfo[] = [
    {
      label: "Experience",
      to: "experience",
      objects: experience,
    },
    { label: "Projects", to: "projects", objects: projects },
    { label: "Articles", to: "articles", objects: Object.values(articles) },
    { label: "Tags", to: "tags", objects: tags },
  ];

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <img src="/logo192.png" alt="Website Logo" height={40} />
      </Toolbar>
      <Divider />
      <List disablePadding className={classes.list}>
        <Category label="Home" to="/" />
        {categories.map((category, i) => {
          const { label, to, objects, onClick } = category;

          return (
            <Category key={i} label={label} to={`/${to}`}>
              {objects.map((fields) => (
                <Item
                  key={fields.id}
                  label={fields.title}
                  to={`/${to}/${fields.id}`}
                  onClick={() => onClick?.(fields.id)}
                />
              ))}
            </Category>
          );
        })}
        <Category label="Contact" to="/contact" />
      </List>
    </>
  );
};

export default Contents;
