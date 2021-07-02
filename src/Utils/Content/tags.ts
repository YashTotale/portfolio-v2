// Internal Imports
import { Article, Experience, Project, ResolvedTag, Tag } from "../types";
import { generateExperienceTitle, getRawExperience } from "./experience";
import { getRawProject } from "./projects";
import { getRawArticle } from "./articles";
import { getAsset } from "./assets";
import { createSorter } from "../funcs";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getTagsArticleFilter,
  getTagsExperienceFilter,
  getTagsProjectFilter,
  getTagsSearch,
  getTagsSort,
  TagsSort,
} from "../../Redux/tags.slice";

// Data Imports
import tags from "../../Data/tag.json";

export const getTags = (): Tag[] => {
  return (Object.values(tags) as unknown) as Tag[];
};

export const getTag = (id: string, isSlug = false): ResolvedTag | null => {
  const single = getRawTag(id, isSlug);
  if (!single) return null;

  const darkIcon = getAsset(single.darkIcon);
  const lightIcon = getAsset(single.lightIcon);

  const experience = single.experience.reduce((arr, exp) => {
    const resolved = getRawExperience(exp);
    if (resolved) arr.push(resolved);
    return arr;
  }, [] as Experience[]);

  const projects = single.projects.reduce((arr, project) => {
    const resolved = getRawProject(project);
    if (resolved) arr.push(resolved);
    return arr;
  }, [] as Project[]);

  const articles = single.articles.reduce((arr, article) => {
    const resolved = getRawArticle(article);
    if (resolved) arr.push(resolved);
    return arr;
  }, [] as Article[]);

  return { ...single, darkIcon, lightIcon, experience, projects, articles };
};

export const getRawTag = (identifier: string, isSlug = false): Tag | null => {
  const all = (tags as unknown) as Record<string, Tag>;
  const single = !isSlug
    ? all[identifier]
    : Object.values(all).find((p) => p.slug === identifier);

  if (!single) return null;
  return single;
};

export const checkExperience = (
  t: ResolvedTag,
  experiences: string[]
): boolean => {
  if (!experiences.length) return true;

  return experiences.some((experience) =>
    t.experience.some((exp) => generateExperienceTitle(exp) === experience)
  );
};

export const checkProjects = (t: ResolvedTag, projects: string[]): boolean => {
  if (!projects.length) return true;

  return projects.some((project) =>
    t.projects.some((p) => p.title === project)
  );
};

export const checkArticles = (t: ResolvedTag, articles: string[]): boolean => {
  if (!articles.length) return true;

  return articles.some((article) =>
    t.articles.some((a) => a.title === article)
  );
};

const searchCache: Record<string, Record<string, boolean>> = {};

export const checkSearch = (t: ResolvedTag, search: string): boolean => {
  if (!search.length) return true;
  if (!searchCache[t.id]) searchCache[t.id] = {};

  const cache = searchCache[t.id][search];
  if (typeof cache === "boolean") return cache;

  const matches: (boolean | undefined)[] = [
    t.title.toLowerCase().includes(search),
  ];

  const result = matches.includes(true);
  searchCache[t.id][search] = result;
  return result;
};

export const useFilteredTags = (): ResolvedTag[] => {
  const tags = useSortedTags(true);

  const search = useSelector(getTagsSearch);
  const normalizedSearch = search.toLowerCase();
  const experienceFilter = useSelector(getTagsExperienceFilter);
  const projectFilter = useSelector(getTagsProjectFilter);
  const articleFilter = useSelector(getTagsArticleFilter);

  return tags.filter((t) => {
    if (!checkExperience(t, experienceFilter)) return false;
    if (!checkProjects(t, projectFilter)) return false;
    if (!checkArticles(t, articleFilter)) return false;
    if (!checkSearch(t, normalizedSearch)) return false;

    return true;
  });
};

export function useSortedTags(resolve: true): ResolvedTag[];
export function useSortedTags(resolve: false): Tag[];
export function useSortedTags(): Tag[];
export function useSortedTags(resolve?: boolean): (ResolvedTag | Tag)[] {
  const sort = useSelector(getTagsSort);
  const sorted = sortTags(sort);
  if (!resolve) return sorted;

  return sorted.reduce((arr, t) => {
    const tag = getTag(t.id);
    if (tag) arr.push(tag);
    return arr;
  }, [] as ResolvedTag[]);
}

export const sortTags = createSorter<TagsSort, Tag>(
  {
    Alphabetically: (a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();

      return aTitle.localeCompare(bTitle);
    },
    "Most Related Experience": (a, b) =>
      b.experience.length - a.experience.length,
    "Most Related Projects": (a, b) => b.projects.length - a.projects.length,
    "Most Related Articles": (a, b) => b.articles.length - a.articles.length,
  },
  getTags()
);
