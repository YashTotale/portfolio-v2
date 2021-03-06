// External Imports
import moment from "moment";
import { Document } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

// Internal Imports
import { compareDates, createResolver, createSorter } from "../funcs";
import { Article, Experience, ResolvedArticle, SubType, Tag } from "../types";
import { getDefaultSortedArticles } from "./main";
import { generateExperienceTitle, getRawExperience } from "./experience";
import { getRawTag } from "./tags";
import { getAsset } from "./assets";

// Redux Imports
import { useSelector } from "react-redux";
import { getArticlesSort } from "../../Redux";
import {
  ArticlesSort,
  ArticlesState,
  getArticlesExperienceFilter,
  getArticlesSearch,
  getArticlesTagFilter,
} from "../../Redux/articles.slice";

// Data Imports
import articles from "../../Data/article.json";

export const getArticles = (): Article[] => {
  return Object.values(articles) as unknown as Article[];
};

export const getArticle = createResolver(
  (id: string, isSlug = false): ResolvedArticle | null => {
    const single = getRawArticle(id, isSlug);
    if (!single) return null;

    const image = getAsset(single.image);

    const associated = getRawExperience(single.associated ?? "") ?? undefined;

    const tags = single.tags.reduce((arr, tag) => {
      const resolved = getRawTag(tag);
      if (resolved) arr.push(resolved);
      return arr;
    }, [] as Tag[]);

    return { ...single, image, associated, tags };
  }
);

export const getRawArticle = (
  identifier: string,
  isSlug = false
): Article | null => {
  const all = articles as unknown as Record<string, Article>;
  const single = !isSlug
    ? all[identifier]
    : Object.values(all).find((a) => a.slug === identifier);

  if (!single) return null;
  return single;
};

export const resolveArticleImage = (article: Article, width = 60): string => {
  return `${getAsset(article.image).file.url}?w=${width}`;
};

export const generateArticlePublished = (
  article: Article | ResolvedArticle
): string => {
  return moment(article.published, "YYYY-MM-DD").format("MMMM D, YYYY");
};

export const checkExperience = (
  a: ResolvedArticle,
  experience: ArticlesState["experienceFilter"]
): boolean => {
  if (experience === null) return true;
  if (!a.associated) return false;

  return experience === generateExperienceTitle(a.associated as Experience);
};

export const checkTags = (a: ResolvedArticle, tags: string[]): boolean => {
  if (!tags.length) return true;
  return tags.every((tag) => a.tags.some((t) => t.title === tag));
};

const searchCache: Record<string, Record<string, boolean>> = {};

export const checkSearch = (a: ResolvedArticle, search: string): boolean => {
  if (!search.length) return true;
  if (!searchCache[a.id]) searchCache[a.id] = {};

  const cache = searchCache[a.id][search];
  if (typeof cache === "boolean") return cache;

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

  const result = matches.includes(true);
  searchCache[a.id][search] = result;
  return result;
};

export const useFilteredArticles = (): ResolvedArticle[] => {
  const articles = useSortedArticles(true);

  const search = useSelector(getArticlesSearch);
  const normalizedSearch = search.toLowerCase();
  const tagFilter = useSelector(getArticlesTagFilter);
  const experienceFilter = useSelector(getArticlesExperienceFilter);

  return articles.filter((a) => {
    if (!checkExperience(a, experienceFilter)) return false;
    if (!checkTags(a, tagFilter)) return false;
    if (!checkSearch(a, normalizedSearch)) return false;

    return true;
  });
};

export function useSortedArticles(resolve: true): ResolvedArticle[];
export function useSortedArticles(resolve: false): Article[];
export function useSortedArticles(): Article[];
export function useSortedArticles(
  resolve?: boolean
): (ResolvedArticle | Article)[] {
  const sort = useSelector(getArticlesSort);
  const sorted = sortArticles(sort);
  if (!resolve) return sorted;

  return sorted.reduce((arr, a) => {
    const article = getArticle(a.id);
    if (article) arr.push(article);
    return arr;
  }, [] as ResolvedArticle[]);
}

export const sortArticles = createSorter<ArticlesSort, Article>(
  {
    Default: (a, b) => {
      const sorted = getDefaultSortedArticles();
      const aIndex = sorted.indexOf(a.id);
      const bIndex = sorted.indexOf(b.id);

      return aIndex - bIndex;
    },
    Alphabetically: (a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();

      return aTitle.localeCompare(bTitle);
    },
    Newest: (a, b) => compareDates(a.published, b.published, "YYYY-MM-DD"),
  },
  getArticles()
);

interface RelatedArticles {
  label: string;
  amount: number;
  image: string;
}

const relatedCache: Record<any, RelatedArticles[]> = {};

export const getArticlesAsRelated = (
  key: SubType<Article, any[]>
): RelatedArticles[] => {
  if (relatedCache[key]) return relatedCache[key];

  const allArticles = sortArticles("Alphabetically");
  const related = allArticles.map((article) => ({
    label: article.title,
    amount: article[key].length,
    image: resolveArticleImage(article),
  }));

  relatedCache[key] = related;
  return related;
};
