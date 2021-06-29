// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import Filters from "../../Components/Filters";
import ArticlePreview from "../../Components/Content/Article/Preview";
import { generatePageTitle } from "../../Utils/funcs";
import { analytics } from "../../Utils/Config/firebase";
import { sortTags } from "../../Utils/Content/tags";
import {
  generateExperienceTitle,
  sortExperience,
} from "../../Utils/Content/experience";
import { useFilteredArticles } from "../../Utils/Content/articles";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getArticlesSearch,
  getArticlesSort,
  setArticlesSearch,
  setArticlesSort,
  getArticlesExperienceFilter,
  getArticlesTagFilter,
} from "../../Redux";
import {
  ArticlesSort,
  ARTICLES_SORT,
  setArticlesExperienceFilter,
  setArticlesTagFilter,
} from "../../Redux/articles.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
  },
  articles: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    width: "100%",
  },
}));

const Articles: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const allTags = sortTags("Alphabetically");
  const allExperience = sortExperience("Alphabetically");

  const search = useSelector(getArticlesSearch);
  const sort = useSelector(getArticlesSort);
  const tagFilter = useSelector(getArticlesTagFilter);
  const experienceFilter = useSelector(getArticlesExperienceFilter);

  analytics.logEvent("page_view", {
    page_title: "Articles",
    ...(location.state as Record<string, unknown>),
  });

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Articles")}</title>
      </Helmet>
      <div className={classes.container}>
        <Filters
          search={{
            defaultSearch: search,
            onSearchChange: (value) => dispatch(setArticlesSearch(value)),
          }}
          sort={{
            value: sort,
            values: ARTICLES_SORT,
            onChange: (value) =>
              dispatch(setArticlesSort(value as ArticlesSort)),
          }}
          related={[
            {
              label: "Tags",
              values: allTags.map((tag) => tag.title),
              value: tagFilter,
              onChange: (values) => dispatch(setArticlesTagFilter(values)),
            },
            {
              label: "Experience",
              values: allExperience.map(generateExperienceTitle),
              value: experienceFilter,
              onChange: (values) =>
                dispatch(setArticlesExperienceFilter(values)),
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
  const search = useSelector(getArticlesSearch);
  const filteredArticles = useFilteredArticles();

  if (!filteredArticles.length)
    return (
      <div className={classes.articles}>
        <Typography variant="h6">No articles found</Typography>
      </div>
    );

  return (
    <div className={classes.articles}>
      {filteredArticles.map((article) => (
        <ArticlePreview key={article.id} id={article.id} search={search} />
      ))}
    </div>
  );
};

export default Articles;
