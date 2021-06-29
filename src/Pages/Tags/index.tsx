// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import TagPreview from "../../Components/Content/Tag/Preview";
import Filters from "../../Components/Filters";
import { analytics } from "../../Utils/Config/firebase";
import { useFilteredTags } from "../../Utils/Content/tags";
import { sortProjects } from "../../Utils/Content/projects";
import { sortArticles } from "../../Utils/Content/articles";
import {
  generateExperienceTitle,
  sortExperience,
} from "../../Utils/Content/experience";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getTagsSearch,
  getTagsSort,
  getTagsArticleFilter,
  getTagsExperienceFilter,
  getTagsProjectFilter,
  setTagsArticleFilter,
  setTagsExperienceFilter,
  setTagsProjectFilter,
  setTagsSearch,
  setTagsSort,
} from "../../Redux";
import { TAGS_SORT, TagsSort } from "../../Redux/tags.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
  },
  tags: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  preview: {
    margin: theme.spacing(2),
  },
}));

const Tags: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const allProjects = sortProjects("Alphabetically");
  const allArticles = sortArticles("Alphabetically");
  const allExperience = sortExperience("Alphabetically");

  const search = useSelector(getTagsSearch);
  const sort = useSelector(getTagsSort);
  const projectFilter = useSelector(getTagsProjectFilter);
  const articleFilter = useSelector(getTagsArticleFilter);
  const experienceFilter = useSelector(getTagsExperienceFilter);

  analytics.logEvent("page_view", {
    page_title: "Tags",
    ...(location.state as Record<string, unknown>),
  });

  return (
    <div className={classes.container}>
      <Filters
        search={{
          defaultSearch: search,
          onSearchChange: (value) => dispatch(setTagsSearch(value)),
        }}
        sort={{
          value: sort,
          values: TAGS_SORT,
          onChange: (value) => dispatch(setTagsSort(value as TagsSort)),
        }}
        related={[
          {
            label: "Experience",
            values: allExperience.map(generateExperienceTitle),
            value: experienceFilter,
            onChange: (values) => dispatch(setTagsExperienceFilter(values)),
          },
          {
            label: "Projects",
            values: allProjects.map((project) => project.title),
            value: projectFilter,
            onChange: (values) => dispatch(setTagsProjectFilter(values)),
          },
          {
            label: "Articles",
            values: allArticles.map((article) => article.title),
            value: articleFilter,
            onChange: (values) => dispatch(setTagsArticleFilter(values)),
          },
        ]}
      />
      <Contents />
    </div>
  );
};

const Contents: FC = () => {
  const classes = useStyles();
  const search = useSelector(getTagsSearch);
  const filteredTags = useFilteredTags();

  if (!filteredTags.length)
    return (
      <div className={classes.tags}>
        <Typography variant="h6">No tags found</Typography>
      </div>
    );

  return (
    <div className={classes.tags}>
      {filteredTags.map((tag) => (
        <TagPreview
          key={tag.id}
          id={tag.id}
          search={search}
          className={classes.preview}
        />
      ))}
    </div>
  );
};

export default Tags;
