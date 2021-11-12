// React Imports
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import Category from "./Category";
import Item from "./Item";
import { Paths } from "../../NavController";
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
        <Link to={Paths.Home}>
          <img src="/logo192.png" alt="Website Logo" height={40} />
        </Link>
      </Toolbar>
      <Divider />
      <List disablePadding className={classes.list}>
        <Category label="Home" to={Paths.Home} icon={<HomeOutlined />} />
        <Category
          label="Experience"
          to={Paths.Experience}
          icon={<WorkOutline />}
        >
          {experience.map((exp) => (
            <Item
              key={exp.id}
              label={generateExperienceTitle(exp)}
              secondary={generateExperienceSubtitle(exp)}
              to={Paths.SingleExperience(exp.slug)}
              highlighted={
                experienceViewable.includes(exp.id) &&
                location.pathname === Paths.Experience
              }
            />
          ))}
        </Category>
        <Category
          label="Education"
          to={Paths.Education}
          icon={<SchoolOutlined />}
        >
          {education.map((ed) => (
            <Item
              key={ed.id}
              label={ed.title}
              to={Paths.SingleEducation(ed.slug)}
              highlighted={
                educationViewable.includes(ed.id) &&
                location.pathname === Paths.Education
              }
            />
          ))}
        </Category>
        <Category label="Projects" to={Paths.Projects} icon={<BuildOutlined />}>
          {projects.map((project) => (
            <Item
              key={project.id}
              label={project.title}
              to={Paths.Project(project.slug)}
              highlighted={
                projectsViewable.includes(project.id) &&
                location.pathname === Paths.Projects
              }
            />
          ))}
        </Category>
        <Category
          label="Articles"
          to={Paths.Articles}
          icon={<DescriptionOutlined />}
        >
          {articles.map((article) => (
            <Item
              key={article.id}
              label={article.title}
              to={Paths.Article(article.slug)}
              highlighted={
                articlesViewable.includes(article.id) &&
                location.pathname === Paths.Articles
              }
            />
          ))}
        </Category>
        <Category label="Tags" to={Paths.Tags} icon={<LabelOutlined />}>
          {tags.map((tag) => (
            <Item key={tag.id} label={tag.title} to={Paths.Tag(tag.slug)} />
          ))}
        </Category>
        <Category
          label="Certifications"
          to={Paths.Certifications}
          icon={<AssignmentTurnedInOutlined />}
        />
        <Category label="Books" to={Paths.Books} icon={<BookOutlined />} />
        <Category
          label="Contact"
          to={Paths.Contact}
          icon={<ChatBubbleOutline />}
        />
      </List>
    </>
  );
};

export default Contents;
