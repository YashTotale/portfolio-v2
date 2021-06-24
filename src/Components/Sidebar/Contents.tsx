// React Imports
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Item from "./Item";
import {
  generateExperienceTitle,
  getSingleExperience,
  useSortedExperience,
} from "../../Utils/Content/experience";
import { useSortedProjects } from "../../Utils/Content/projects";
import { useSortedArticles } from "../../Utils/Content/articles";
import { useSortedTags } from "../../Utils/Content/tags";
import { SIDEBAR_WIDTH } from "../../Utils/constants";
import { Experience, Article, Project, Tag } from "../../Utils/types";

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
  objects: (Experience | Project | Article | Tag)[];
  createTitle?: (id: string) => string;
  onClick?: (id: string) => void;
}

const Contents: FC = () => {
  const classes = useStyles();

  const experience = useSortedExperience();
  const projects = useSortedProjects();
  const articles = useSortedArticles();
  const tags = useSortedTags();

  const categories: CategoryInfo[] = [
    {
      label: "Experience",
      to: "experience",
      objects: experience,
      createTitle: (id) => {
        const exp = getSingleExperience(id);
        if (!exp) return "";
        return generateExperienceTitle(exp);
      },
    },
    { label: "Projects", to: "projects", objects: projects },
    { label: "Articles", to: "articles", objects: Object.values(articles) },
    { label: "Tags", to: "tags", objects: tags },
  ];

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Link to="/">
          <img src="/logo192.png" alt="Website Logo" height={40} />
        </Link>
      </Toolbar>
      <Divider />
      <List disablePadding className={classes.list}>
        <Category label="Home" to="/" />
        {categories.map((category, i) => {
          const { label, to, objects, createTitle, onClick } = category;

          return (
            <Category key={i} label={label} to={`/${to}`}>
              {objects.map((fields) => (
                <Item
                  key={fields.id}
                  label={createTitle ? createTitle(fields.id) : fields.title}
                  to={`/${to}/${fields.id}`}
                  onClick={() => onClick?.(fields.id)}
                />
              ))}
            </Category>
          );
        })}
        <Category label="Books" to="/books" />
        <Category label="Contact" to="/contact" />
      </List>
    </>
  );
};

export default Contents;
