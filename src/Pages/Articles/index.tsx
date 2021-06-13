// React Imports
import React, { FC, useCallback, useMemo } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import Filters from "../../Components/Filters";
import ArticlePreview from "../../Components/Article/Preview";
import { ResolvedArticle } from "../../Utils/types";
import { sortTags } from "../../Utils/Content/tags";
import {
  generateExperienceTitle,
  sortExperience,
} from "../../Utils/Content/experience";
import { getArticle, useSortedArticles } from "../../Utils/Content/articles";

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
  const allTags = sortTags("Alphabetically");
  const allExperience = sortExperience("Alphabetically");

  const search = useSelector(getArticlesSearch);
  const sort = useSelector(getArticlesSort);
  const tagFilter = useSelector(getArticlesTagFilter);
  const experienceFilter = useSelector(getArticlesExperienceFilter);

  return (
    <div className={classes.container}>
      <Filters
        search={{
          defaultSearch: search,
          onSearchChange: (value) => dispatch(setArticlesSearch(value)),
        }}
        sort={{
          value: sort,
          values: ARTICLES_SORT,
          onChange: (value) => dispatch(setArticlesSort(value as ArticlesSort)),
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
            onChange: (values) => dispatch(setArticlesExperienceFilter(values)),
          },
        ]}
      />
      <Contents />
    </div>
  );
};

const Contents: FC = () => {
  const classes = useStyles();

  const nonResolved = useSortedArticles();
  const articles = nonResolved.reduce((arr, a) => {
    const article = getArticle(a.id);
    if (article) arr.push(article);
    return arr;
  }, [] as ResolvedArticle[]);

  const search = useSelector(getArticlesSearch);
  const normalizedSearch = search.toLowerCase();
  const tagFilter = useSelector(getArticlesTagFilter);
  const experienceFilter = useSelector(getArticlesExperienceFilter);

  const checkExperienceFilter = useCallback(
    (a: ResolvedArticle) => {
      if (!experienceFilter.length) return true;

      return experienceFilter.some(
        (exp) => a.associated && generateExperienceTitle(a.associated) === exp
      );
    },
    [experienceFilter]
  );

  const checkTagFilter = useCallback(
    (a: ResolvedArticle) => {
      if (!tagFilter.length) return true;

      return tagFilter.some((tag) => a.tags.some((t) => t.title === tag));
    },
    [tagFilter]
  );

  const getSearchMatch = useCallback(
    (a: ResolvedArticle) => {
      const matches: boolean[] = [
        a.title.toLowerCase().includes(normalizedSearch),
        documentToPlainTextString(a.description as Document)
          .toLowerCase()
          .includes(normalizedSearch),
        a.associated?.title.toLowerCase().includes(normalizedSearch) ?? false,
        a.published.toLowerCase().includes(normalizedSearch),
        a.tags.some((tag) =>
          tag.title.toLowerCase().includes(normalizedSearch)
        ),
      ];

      return matches;
    },
    [normalizedSearch]
  );

  const filteredArticles = useMemo(
    () =>
      articles.reduce((arr, article) => {
        const experienceFiltered = checkExperienceFilter(article);
        if (!experienceFiltered) return arr;

        const tagFiltered = checkTagFilter(article);
        if (!tagFiltered) return arr;

        if (normalizedSearch.length) {
          const matches = getSearchMatch(article);
          if (!matches.some((bool) => bool)) return arr;
        }

        return [...arr, article];
      }, [] as ResolvedArticle[]),
    [
      articles,
      normalizedSearch,
      checkExperienceFilter,
      checkTagFilter,
      getSearchMatch,
    ]
  );

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
