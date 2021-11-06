// React Imports
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import Category from "./Category";
import Item from "./Item";
import {
  generateExperienceSubtitle,
  generateExperienceTitle,
  useSortedExperience,
} from "../../../../Utils/Content/experience";
import { useSortedEducation } from "../../../../Utils/Content/education";
import { useSortedProjects } from "../../../../Utils/Content/projects";
import { useSortedArticles } from "../../../../Utils/Content/articles";
import { useSortedTags } from "../../../../Utils/Content/tags";
import { SIDEBAR_WIDTH } from "../../../../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getArticlesViewable,
  getEducationViewable,
  getExperienceViewable,
  getProjectsViewable,
} from "../../../../Redux";

// Material UI Imports
import { Divider, List, Toolbar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
  HomeOutlined,
  WorkOutline,
  SchoolOutlined,
  BuildOutlined,
  DescriptionOutlined,
  LabelOutlined,
  BookOutlined,
  ChatBubbleOutline,
  AssignmentTurnedInOutlined,
} from "@mui/icons-material";

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
        <Link to="/">
          <img src="/logo192.png" alt="Website Logo" height={40} />
        </Link>
      </Toolbar>
      <Divider />
      <List disablePadding className={classes.list}>
        <Category label="Home" to="/" icon={<HomeOutlined />} />
        <Category label="Experience" to="/experience" icon={<WorkOutline />}>
          {experience.map((exp) => (
            <Item
              key={exp.id}
              label={generateExperienceTitle(exp)}
              secondary={generateExperienceSubtitle(exp)}
              to={`/experience/${exp.slug}`}
              highlighted={
                experienceViewable.includes(exp.id) &&
                location.pathname === "/experience"
              }
            />
          ))}
        </Category>
        <Category label="Education" to="/education" icon={<SchoolOutlined />}>
          {education.map((ed) => (
            <Item
              key={ed.id}
              label={ed.title}
              to={`/education/${ed.slug}`}
              highlighted={
                educationViewable.includes(ed.id) &&
                location.pathname === "/education"
              }
            />
          ))}
        </Category>
        <Category label="Projects" to="/projects" icon={<BuildOutlined />}>
          {projects.map((project) => (
            <Item
              key={project.id}
              label={project.title}
              to={`/projects/${project.slug}`}
              highlighted={
                projectsViewable.includes(project.id) &&
                location.pathname === "/projects"
              }
            />
          ))}
        </Category>
        <Category
          label="Articles"
          to="/articles"
          icon={<DescriptionOutlined />}
        >
          {articles.map((article) => (
            <Item
              key={article.id}
              label={article.title}
              to={`/articles/${article.slug}`}
              highlighted={
                articlesViewable.includes(article.id) &&
                location.pathname === "/articles"
              }
            />
          ))}
        </Category>
        <Category label="Tags" to="/tags" icon={<LabelOutlined />}>
          {tags.map((tag) => (
            <Item key={tag.id} label={tag.title} to={`/tags/${tag.slug}`} />
          ))}
        </Category>
        <Category
          label="Certifications"
          to="/certifications"
          icon={<AssignmentTurnedInOutlined />}
        />
        <Category label="Books" to="/books" icon={<BookOutlined />} />
        <Category label="Contact" to="/contact" icon={<ChatBubbleOutline />} />
      </List>
    </>
  );
};

export default Contents;
