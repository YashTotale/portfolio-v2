// React Imports
import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import TagPreview from "../../Components/Content/Tag/Preview";
import Filters from "../../Components/Custom/Filters";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";
import { getTagCategories, useFilteredTags } from "../../Utils/Content/tags";
import { getExperienceAsRelated } from "../../Utils/Content/experience";
import { getEducationAsRelated } from "../../Utils/Content/education";
import { getProjectsAsRelated } from "../../Utils/Content/projects";
import { getArticlesAsRelated } from "../../Utils/Content/articles";

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
  getTagsEducationFilter,
  setTagsCategoryFilter,
  setTagsEducationFilter,
  setTagsProjectFilter,
  setTagsSearch,
  getTagsCategoryFilter,
  setTagsSort,
} from "../../Redux";
import { TAGS_SORT, TagsSort } from "../../Redux/tags.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { makeStyles, Typography, useTheme } from "@material-ui/core";

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
    width: `calc(100% + ${theme.spacing(4)}px)`,

    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  tag: {
    margin: theme.spacing(2),

    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(2, 0),
    },
  },
  divider: {
    margin: theme.spacing(1.5, 0, 1),
  },
  noFound: {
    marginTop: theme.spacing(1),
  },
}));

const Tags: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isDarkMode = theme.palette.type === "dark";

  const allCategories = getTagCategories();
  const allExperience = getExperienceAsRelated("tags", isDarkMode);
  const allEducation = getEducationAsRelated("tags");
  const allProjects = getProjectsAsRelated("tags");
  const allArticles = getArticlesAsRelated("tags");

  const search = useSelector(getTagsSearch);
  const sort = useSelector(getTagsSort);
  const categoryFilter = useSelector(getTagsCategoryFilter);
  const experienceFilter = useSelector(getTagsExperienceFilter);
  const educationFilter = useSelector(getTagsEducationFilter);
  const projectFilter = useSelector(getTagsProjectFilter);
  const articleFilter = useSelector(getTagsArticleFilter);

  useAnalytics("Tags");

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Tags")}</title>
      </Helmet>
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
              label: "Categories",
              values: allCategories,
              value: categoryFilter,
              onChange: (values: Parameters<typeof setTagsCategoryFilter>[0]) =>
                dispatch(setTagsCategoryFilter(values)),
            },
            {
              label: "Experience",
              values: allExperience,
              value: experienceFilter,
              onChange: (
                values: Parameters<typeof setTagsExperienceFilter>[0]
              ) => dispatch(setTagsExperienceFilter(values)),
            },
            {
              label: "Education",
              values: allEducation,
              value: educationFilter,
              onChange: (
                values: Parameters<typeof setTagsEducationFilter>[0]
              ) => dispatch(setTagsEducationFilter(values)),
            },
            {
              label: "Projects",
              values: allProjects,
              value: projectFilter,
              onChange: (values: Parameters<typeof setTagsProjectFilter>[0]) =>
                dispatch(setTagsProjectFilter(values)),
            },
            {
              label: "Articles",
              values: allArticles,
              value: articleFilter,
              onChange: (values: Parameters<typeof setTagsArticleFilter>[0]) =>
                dispatch(setTagsArticleFilter(values)),
            },
          ]}
        />
        <Contents />
      </div>
    </>
  );
};

const Contents: FC = () => {
  const classes = useStyles();
  const search = useSelector(getTagsSearch);
  const filteredTags = useFilteredTags();

  return (
    <>
      <HorizontalDivider className={classes.divider} />
      <Typography align="center" variant="h4">
        Tags
      </Typography>
      {filteredTags.length ? (
        <div className={classes.tags}>
          {filteredTags.map((tag) => (
            <TagPreview
              key={tag.id}
              id={tag.id}
              search={search}
              className={classes.tag}
            />
          ))}
        </div>
      ) : (
        <Typography variant="h5" className={classes.noFound}>
          No tags found
        </Typography>
      )}
    </>
  );
};

export default Tags;
