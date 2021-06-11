// Internal Imports
import { Article, ResolvedArticle, Tag } from "../types";
import { getRawExperience } from "./experience";
import { getRawTag } from "./tags";
import { getAsset } from "./assets";

// Redux Imports
import { useSelector } from "react-redux";
import { getArticlesSort } from "../../Redux";

// Data Imports
import articles from "../../Data/article.json";
import { ArticlesSort } from "../../Redux/articles.slice";
import { compareDates } from "../funcs";

const sortCache: Record<ArticlesSort, Article[] | null> = {
  Alphabetically: null,
  Newest: null,
  Oldest: null,
};

export const getArticles = (): Article[] => {
  return (Object.values(articles) as unknown) as Article[];
};

export const getProject = (id: string): ResolvedArticle | null => {
  const single = getRawArticle(id);
  if (!single) return null;

  const image = getAsset(single.image);

  const associated = getRawExperience(single.associated ?? "") ?? undefined;

  const tags = single.tags.reduce((arr, tag) => {
    const resolved = getRawTag(tag);
    if (resolved) arr.push(resolved);
    return arr;
  }, [] as Tag[]);

  return { ...single, image, associated, tags };
};

export const getRawArticle = (id: string): Article | null => {
  const all = (articles as unknown) as Record<string, Article>;
  const single = all[id];

  if (!single) return null;
  return single;
};

export const useSortedArticles = (): Article[] => {
  const sort = useSelector(getArticlesSort);
  return sortArticles(sort);
};

export const sortArticles = (sort: ArticlesSort): Article[] => {
  const projects = getArticles();

  if (sortCache[sort]) return sortCache[sort] as Article[];

  const toSort = [...projects];
  let sorted = projects;

  switch (sort) {
    case "Alphabetically": {
      sorted = toSort.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();

        return aTitle.localeCompare(bTitle);
      });
      break;
    }
    case "Newest": {
      sorted = toSort.sort((a, b) =>
        compareDates(a.published, b.published, "YYYY-MM-DD")
      );
      break;
    }
    case "Oldest": {
      sorted = toSort.sort((a, b) =>
        compareDates(a.published, b.published, "YYYY-MM-DD", -1)
      );
      break;
    }
  }

  sortCache[sort] = sorted;
  return sorted;
};
