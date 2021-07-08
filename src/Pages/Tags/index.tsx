// React Imports
import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import TagPreview from "../../Components/Content/Tag/Preview";
import Filters from "../../Components/Custom/Filters";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";
import { useFilteredTags } from "../../Utils/Content/tags";
import {
  generateExperienceTitle,
  sortExperience,
} from "../../Utils/Content/experience";
import { sortEducation } from "../../Utils/Content/education";
import { sortProjects } from "../../Utils/Content/projects";
import { sortArticles } from "../../Utils/Content/articles";

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
  setTagsEducationFilter,
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

  const allProjects = sortProjects("Alphabetically");
  const allArticles = sortArticles("Alphabetically");
  const allExperience = sortExperience("Alphabetically");
  const allEducation = sortEducation("Alphabetically");

  const search = useSelector(getTagsSearch);
  const sort = useSelector(getTagsSort);
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
              label: "Experience",
              values: allExperience.map(generateExperienceTitle),
              value: experienceFilter,
              onChange: (values) => dispatch(setTagsExperienceFilter(values)),
            },
            {
              label: "Education",
              values: allEducation.map((ed) => ed.title),
              value: educationFilter,
              onChange: (values) => dispatch(setTagsEducationFilter(values)),
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
