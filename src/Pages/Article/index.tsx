// React Imports
import React, { FC } from "react";
import { useParams } from "react-router";
import NotFound from "../NotFound";
import ArticleMain from "../../Components/Content/Article/Main";
import NavButton from "../../Components/NavButton";
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
  topButtons: {
    display: "flex",
    width: "100%",
  },
  allArticles: {
    maxWidth: "25%",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "45%",
    },
  },
  buttons: {
    display: "flex",
    width: "100%",
    margin: theme.spacing(2, 0, 4),
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
    <div className={classes.container}>
      <div className={classes.topButtons}>
        <NavButton
          to="/articles"
          label="All Articles"
          type="next"
          typeLabel=""
          className={classes.allArticles}
        />
      </div>
      <ArticleMain id={article.id} className={classes.article} />
      <div className={classes.buttons}>
        {prevArticle && (
          <NavButton
            to={`/articles/${prevArticle.slug}`}
            label={prevArticle.title}
            type="previous"
            typeLabel="Previous Article"
          />
        )}
        {nextArticle && (
          <NavButton
            to={`/articles/${nextArticle.slug}`}
            label={nextArticle.title}
            type="next"
            typeLabel="Next Article"
          />
        )}
      </div>
    </div>
  );
};

export default Article;
