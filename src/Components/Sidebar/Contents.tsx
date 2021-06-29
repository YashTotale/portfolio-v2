// React Imports
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Item from "./Item";
import {
  generateExperienceTitle,
  useSortedExperience,
} from "../../Utils/Content/experience";
import { useSortedProjects } from "../../Utils/Content/projects";
import { useSortedArticles } from "../../Utils/Content/articles";
import { useSortedTags } from "../../Utils/Content/tags";
import { SIDEBAR_WIDTH } from "../../Utils/constants";

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

const Contents: FC = () => {
  const classes = useStyles();

  const experience = useSortedExperience();
  const projects = useSortedProjects();
  const articles = useSortedArticles();
  const tags = useSortedTags();

  const generatePath = (p: string) => ({
    pathname: p,
    state: {
      from_type: "sidebar",
    },
  });

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Link
          to={{
            pathname: "/",
            state: {
              from_type: "sidebar_icon",
            },
          }}
        >
          <img src="/logo192.png" alt="Website Logo" height={40} />
        </Link>
      </Toolbar>
      <Divider />
      <List disablePadding className={classes.list}>
        <Category label="Home" to={generatePath("/")} />
        <Category label="Experience" to={generatePath("/experience")}>
          {experience.map((exp) => (
            <Item
              key={exp.id}
              label={generateExperienceTitle(exp)}
              to={generatePath(`/experience/${exp.slug}`)}
            />
          ))}
        </Category>
        <Category label="Projects" to="/projects">
          {projects.map((project) => (
            <Item
              key={project.id}
              label={project.title}
              to={generatePath(`/projects/${project.slug}`)}
            />
          ))}
        </Category>
        <Category label="Articles" to="/articles">
          {articles.map((article) => (
            <Item
              key={article.id}
              label={article.title}
              to={generatePath(`/articles/${article.slug}`)}
            />
          ))}
        </Category>
        <Category label="Tags" to="/tags">
          {tags.map((tag) => (
            <Item
              key={tag.id}
              label={tag.title}
              to={generatePath(`/tags/${tag.slug}`)}
            />
          ))}
        </Category>
        <Category label="Books" to={generatePath("/books")} />
        <Category label="Contact" to={generatePath("/contact")} />
      </List>
    </>
  );
};

export default Contents;
