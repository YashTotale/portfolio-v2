// React Imports
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import NotFound from "../NotFound";
import { useAnalytics } from "../../Hooks";
import ArticleMain from "../../Components/Content/Article/Main";
import TopNav from "../../Components/Custom/Navigation/TopNav";
import BottomNav from "../../Components/Custom/Navigation/BottomNav";
import { generatePageTitle } from "../../Utils/funcs";
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
}));

interface Params {
  slug: string;
}

const Article: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();

  const article = getArticle(slug, true);
  const sortedArticles = useSortedArticles();

  useAnalytics(article?.title);

  if (!article)
    return (
      <NotFound
        name="article"
        redirect="/articles"
        redirectName="Articles Page"
      />
    );

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
        <ArticleMain id={article.id} />
        <BottomNav
          basePath="articles"
          label="Article"
          prevContent={prevArticle}
          nextContent={nextArticle}
        />
      </div>
    </>
  );
};

export default Article;
