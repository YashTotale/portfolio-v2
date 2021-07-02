// React Imports
import React, { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import NotFound from "../NotFound";
import ArticleMain from "../../Components/Content/Article/Main";
import NavButton from "../../Components/NavButton";
import TopNav from "../../Components/TopNav";
import { useTitle } from "../../Context/HeadContext";
import {
  generatePageTitle,
  generateSearch,
  getSearch,
} from "../../Utils/funcs";
import { analytics } from "../../Utils/Config/firebase";
import { getArticle, useSortedArticles } from "../../Utils/Content/articles";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  article: {
    margin: theme.spacing(1, 0),
  },
  buttons: {
    display: "flex",
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

interface Params {
  slug: string;
}

const Article: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();

  const location = useLocation();
  const title = useTitle();
  const search = getSearch(location.search);

  const article = getArticle(slug, true);
  const sortedArticles = useSortedArticles();

  if (!article)
    return (
      <NotFound
        name="article"
        redirect="/articles"
        redirectName="Articles Page"
      />
    );

  analytics.logEvent("page_view", {
    page_title: article.title,
    ...search,
  });

  const articleIndex = sortedArticles.findIndex((p) => p.id === article.id);
  const prevArticle = sortedArticles[articleIndex - 1];
  const nextArticle = sortedArticles[articleIndex + 1];

  return (
    <>
      <Helmet>
        <title>{generatePageTitle(article.title)}</title>
      </Helmet>
      <div className={classes.container}>
        <TopNav allPath="articles" allLabel="Articles" />
        <ArticleMain id={article.id} className={classes.article} />
        <div className={classes.buttons}>
          {prevArticle && (
            <NavButton
              to={{
                pathname: `/articles/${prevArticle.slug}`,
                search: generateSearch(
                  {
                    from_path: location.pathname,
                    from_type: "prev_nav_button",
                  },
                  title
                ),
              }}
              label={prevArticle.title}
              type="previous"
              typeLabel="Previous Article"
            />
          )}
          {nextArticle && (
            <NavButton
              to={{
                pathname: `/articles/${nextArticle.slug}`,
                search: generateSearch(
                  {
                    from_path: location.pathname,
                    from_type: "next_nav_button",
                  },
                  title
                ),
              }}
              label={nextArticle.title}
              type="next"
              typeLabel="Next Article"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Article;
