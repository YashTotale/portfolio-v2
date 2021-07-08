// React Imports
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { LocationDescriptor } from "history";
import Category from "./Category";
import Item from "./Item";
import { generateSearch } from "../../../Utils/funcs";
import {
  generateExperienceSubtitle,
  generateExperienceTitle,
  useSortedExperience,
} from "../../../Utils/Content/experience";
import { useSortedEducation } from "../../../Utils/Content/education";
import { useSortedProjects } from "../../../Utils/Content/projects";
import { useSortedArticles } from "../../../Utils/Content/articles";
import { useSortedTags } from "../../../Utils/Content/tags";
import { SIDEBAR_WIDTH } from "../../../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getArticlesViewable,
  getEducationViewable,
  getExperienceViewable,
  getProjectsViewable,
} from "../../../Redux";

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

export const generateSidebarPath = (p: string): LocationDescriptor => ({
  pathname: p,
  search: generateSearch(
    {
      from_type: "sidebar",
    },
    null
  ),
});

const Contents: FC = () => {
  const classes = useStyles();
  const location = useLocation();

  const experience = useSortedExperience();
  const experienceViewable = useSelector(getExperienceViewable);

  const education = useSortedEducation();
  const educationViewable = useSelector(getEducationViewable);

  const projects = useSortedProjects();
  const projectsViewable = useSelector(getProjectsViewable);

  const articles = useSortedArticles();
  const articlesViewable = useSelector(getArticlesViewable);

  const tags = useSortedTags();

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Link
          to={{
            pathname: "/",
            search: generateSearch(
              {
                from_type: "sidebar_icon",
              },
              null
            ),
          }}
        >
          <img src="/logo192.png" alt="Website Logo" height={40} />
        </Link>
      </Toolbar>
      <Divider />
      <List disablePadding className={classes.list}>
        <Category label="Home" to={generateSidebarPath("/")} />
        <Category label="Experience" to={generateSidebarPath("/experience")}>
          {experience.map((exp) => (
            <Item
              key={exp.id}
              label={generateExperienceTitle(exp)}
              secondary={generateExperienceSubtitle(exp)}
              to={generateSidebarPath(`/experience/${exp.slug}`)}
              highlighted={
                experienceViewable.includes(exp.id) &&
                location.pathname === "/experience"
              }
            />
          ))}
        </Category>
        <Category label="Education" to={generateSidebarPath("/education")}>
          {education.map((ed) => (
            <Item
              key={ed.id}
              label={ed.title}
              to={generateSidebarPath(`/education/${ed.slug}`)}
              highlighted={
                educationViewable.includes(ed.id) &&
                location.pathname === "/education"
              }
            />
          ))}
        </Category>
        <Category label="Projects" to={generateSidebarPath("/projects")}>
          {projects.map((project) => (
            <Item
              key={project.id}
              label={project.title}
              to={generateSidebarPath(`/projects/${project.slug}`)}
              highlighted={
                projectsViewable.includes(project.id) &&
                location.pathname === "/projects"
              }
            />
          ))}
        </Category>
        <Category label="Articles" to={generateSidebarPath("/articles")}>
          {articles.map((article) => (
            <Item
              key={article.id}
              label={article.title}
              to={generateSidebarPath(`/articles/${article.slug}`)}
              highlighted={
                articlesViewable.includes(article.id) &&
                location.pathname === "/articles"
              }
            />
          ))}
        </Category>
        <Category label="Tags" to={generateSidebarPath("/tags")}>
          {tags.map((tag) => (
            <Item
              key={tag.id}
              label={tag.title}
              to={generateSidebarPath(`/tags/${tag.slug}`)}
            />
          ))}
        </Category>
        <Category label="Books" to={generateSidebarPath("/books")} />
        <Category label="Contact" to={generateSidebarPath("/contact")} />
      </List>
    </>
  );
};

export default Contents;
