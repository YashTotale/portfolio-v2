// React Imports
import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Waypoint } from "react-waypoint";
import { useAnalytics } from "../../Hooks";
import Filters from "../../Components/Custom/Filters";
import ArticlePreview from "../../Components/Content/Article/Preview";
import { useFilteredArticles } from "../../Utils/Content/articles";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";
import { sortTags } from "../../Utils/Content/tags";
import {
  generateExperienceTitle,
  sortExperience,
} from "../../Utils/Content/experience";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getArticlesSearch,
  getArticlesSort,
  removeAllArticleViewable,
  removeArticleViewable,
  setArticlesSearch,
  addArticleViewable,
  setArticlesSort,
  getArticlesExperienceFilter,
  getArticlesViewable,
  getArticlesTagFilter,
  setArticlesExperienceFilter,
  setArticlesTagFilter,
} from "../../Redux";
import { ArticlesSort, ARTICLES_SORT } from "../../Redux/articles.slice";
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
  articles: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    width: `calc(100% + ${theme.spacing(4)}px)`,

    "&:after": {
      content: "''",
      flex: "auto",
    },
  },
  article: {
    margin: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(1.5, 0, 1),
  },
}));

const Articles: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const allTags = sortTags("Alphabetically");
  const allExperience = sortExperience("Alphabetically");

  const search = useSelector(getArticlesSearch);
  const sort = useSelector(getArticlesSort);
  const tagFilter = useSelector(getArticlesTagFilter);
  const experienceFilter = useSelector(getArticlesExperienceFilter);

  useAnalytics("Articles");

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
  const dispatch = useAppDispatch();
  const search = useSelector(getArticlesSearch);
  const filteredArticles = useFilteredArticles();

  const articlesViewable = useSelector(getArticlesViewable);

  useEffect(() => {
    articlesViewable.forEach((a) => {
      if (!filteredArticles.find((art) => art.id === a)) {
        dispatch(removeArticleViewable(a));
      }
    });
  }, [dispatch, filteredArticles, articlesViewable]);

  useEffect(() => {
    dispatch(removeAllArticleViewable());
  }, [dispatch]);

  if (!filteredArticles.length)
    return (
      <div className={classes.articles}>
        <Typography variant="h6">No articles found</Typography>
      </div>
    );

  return (
    <>
      <HorizontalDivider className={classes.divider} />
      <Typography align="center" variant="h4">
        Articles
      </Typography>
      <div className={classes.articles}>
        {filteredArticles.map((article) => (
          <Waypoint
            key={article.id}
            onEnter={() => dispatch(addArticleViewable(article.id))}
            onLeave={() => dispatch(removeArticleViewable(article.id))}
            topOffset="30%"
            bottomOffset="30%"
          >
            <ArticlePreview
              id={article.id}
              search={search}
              className={classes.article}
            />
          </Waypoint>
        ))}
      </div>
    </>
  );
};

export default Articles;
