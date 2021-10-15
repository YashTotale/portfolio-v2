// React Imports
import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import Filters from "../../Components/Custom/Filters";
import Tracker from "../../Components/Custom/Tracker";
import ArticlePreview from "../../Components/Content/Article/Preview";
import { useFilteredArticles } from "../../Utils/Content/articles";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";
import { getTagsAsRelated } from "../../Utils/Content/tags";
import { getExperienceAsRelated } from "../../Utils/Content/experience";

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
import { makeStyles, Typography, useTheme } from "@material-ui/core";

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

    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  article: {
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

const Articles: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isDarkMode = theme.palette.type === "dark";

  const allTags = getTagsAsRelated("articles", isDarkMode);
  const allExperience = getExperienceAsRelated("articles", isDarkMode);

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
              label: "Experience",
              values: allExperience,
              value: experienceFilter,
              onChange: (
                values: Parameters<typeof setArticlesExperienceFilter>[0]
              ) => dispatch(setArticlesExperienceFilter(values)),
            },
            {
              label: "Tags",
              values: allTags,
              value: tagFilter,
              onChange: (values: Parameters<typeof setArticlesTagFilter>[0]) =>
                dispatch(setArticlesTagFilter(values)),
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

  return (
    <>
      <HorizontalDivider className={classes.divider} />
      <Typography align="center" variant="h4">
        Articles
      </Typography>
      {filteredArticles.length ? (
        <div className={classes.articles}>
          {filteredArticles.map((article) => (
            <Tracker
              key={article.id}
              onEnter={() => dispatch(addArticleViewable(article.id))}
              onLeave={() => dispatch(removeArticleViewable(article.id))}
              canRemoveAll={!!articlesViewable.length}
              removeAll={() => dispatch(removeAllArticleViewable())}
              topOffset="30%"
              bottomOffset="30%"
            >
              <ArticlePreview
                id={article.id}
                search={search}
                className={classes.article}
              />
            </Tracker>
          ))}
        </div>
      ) : (
        <Typography variant="h5" className={classes.noFound}>
          No articles found
        </Typography>
      )}
    </>
  );
};

export default Articles;
