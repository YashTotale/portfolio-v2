// External Imports
import moment from "moment";
import { Document } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

// Internal Imports
import { compareDates, createSorter } from "../funcs";
import { Article, Experience, ResolvedArticle, Tag } from "../types";
import { generateExperienceTitle, getRawExperience } from "./experience";
import { getRawTag } from "./tags";
import { getAsset } from "./assets";

// Redux Imports
import { useSelector } from "react-redux";
import { getArticlesSort } from "../../Redux";
import { ArticlesSort } from "../../Redux/articles.slice";

// Data Imports
import articles from "../../Data/article.json";

export const getArticles = (): Article[] => {
  return (Object.values(articles) as unknown) as Article[];
};

export const getArticle = (id: string): ResolvedArticle | null => {
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

export const generateArticlePublished = (
  article: Article | ResolvedArticle
): string => {
  return moment(article.published, "YYYY-MM-DD").format("MMMM D, YYYY");
};

export const checkExperience = (
  a: ResolvedArticle,
  experiences: string[]
): boolean => {
  if (!experiences.length) return true;
  if (!a.associated) return false;

  return experiences.some(
    (exp) => generateExperienceTitle(a.associated as Experience) === exp
  );
};

export const checkTags = (a: ResolvedArticle, tags: string[]): boolean => {
  if (!tags.length) return true;

  return tags.some((tag) => a.tags.some((t) => t.title === tag));
};

export const checkSearch = (a: ResolvedArticle, search: string): boolean => {
  const matches: (boolean | undefined)[] = [
    a.title.toLowerCase().includes(search),
    documentToPlainTextString(a.description as Document)
      .toLowerCase()
      .includes(search),
    a.associated &&
      generateExperienceTitle(a.associated).toLowerCase().includes(search),
    a.published.toLowerCase().includes(search),
    a.tags.some((tag) => tag.title.toLowerCase().includes(search)),
  ];

  return matches.includes(true);
};

export const useSortedArticles = (): Article[] => {
  const sort = useSelector(getArticlesSort);
  return sortArticles(sort);
};

export const sortArticles = createSorter<ArticlesSort, Article>(
  {
    Alphabetically: (a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();

      return aTitle.localeCompare(bTitle);
    },
    Newest: (a, b) => compareDates(a.published, b.published, "YYYY-MM-DD"),
    Oldest: (a, b) => compareDates(a.published, b.published, "YYYY-MM-DD", -1),
  },
  getArticles
);
