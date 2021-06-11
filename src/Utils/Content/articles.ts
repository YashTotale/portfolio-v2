// Internal Imports
import { Article } from "../types";

// Data Imports
import articles from "../../Data/article.json";

export const getArticles = (): Article[] => {
  return (Object.values(articles) as unknown) as Article[];
};

export const getRawArticle = (id: string): Article | null => {
  const all = (articles as unknown) as Record<string, Article>;
  const single = all[id];

  if (!single) return null;
  return single;
};
