// External Imports
import { Document } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

// Internal Imports
import { createSorter, sortByDate } from "../funcs";
import {
  Article,
  Experience,
  Project,
  ResolvedExperience,
  Tag,
} from "../types";
import { getDefaultSortedExperience } from "./main";
import { getRawProject } from "./projects";
import { getRawArticle } from "./articles";
import { getRawTag } from "./tags";
import { getAsset } from "./assets";

// Redux Imports
import { useSelector } from "react-redux";
import {
  ExperienceSort,
  getExperienceProjectFilter,
  getExperienceSearch,
  getExperienceSort,
  getExperienceTagFilter,
} from "../../Redux/experience.slice";

// Data Imports
import experience from "../../Data/experience.json";

export const getExperience = (): Experience[] => {
  return (Object.values(experience) as unknown) as Experience[];
};

export const getSingleExperience = (
  id: string,
  isSlug = false
): ResolvedExperience | null => {
  const single = getRawExperience(id, isSlug);
  if (!single) return null;

  const image = getAsset(single.image);

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

  const tags = single.tags.reduce((arr, tag) => {
    const resolved = getRawTag(tag);
    if (resolved) arr.push(resolved);
    return arr;
  }, [] as Tag[]);

  return { ...single, image, projects, articles, tags };
};

export const getRawExperience = (
  identifier: string,
  isSlug = false
): Experience | null => {
  const all = (experience as unknown) as Record<string, Experience>;
  const single = !isSlug
    ? all[identifier]
    : Object.values(all).find((e) => e.slug === identifier);

  if (!single) return null;
  return single;
};

export const generateExperienceTitle = (
  exp: Experience | ResolvedExperience
): string => {
  return `${exp.role} @ ${exp.title}`;
};

export const generateExperienceTimeline = (
  exp: Experience | ResolvedExperience
): string => {
  const start = exp.start;
  let end = exp.end;

  if (end === start) return start;

  if (!end) end = "Present";
  return `${start} - ${end}`;
};

export const checkProjects = (
  e: ResolvedExperience,
  projects: string[]
): boolean => {
  if (!projects.length) return true;
  return projects.some((project) =>
    e.projects.some((p) => p.title === project)
  );
};

export const checkTags = (e: ResolvedExperience, tags: string[]): boolean => {
  if (!tags.length) return true;
  return tags.some((tag) => e.tags.some((t) => t.title === tag));
};

const searchCache: Record<string, Record<string, boolean>> = {};

export const checkSearch = (e: ResolvedExperience, search: string): boolean => {
  if (!search.length) return true;
  if (!searchCache[e.id]) searchCache[e.id] = {};

  const cache = searchCache[e.id][search];
  if (typeof cache === "boolean") return cache;

  const matches: (boolean | undefined)[] = [
    generateExperienceTitle(e).toLowerCase().includes(search),
    documentToPlainTextString(e.description as Document)
      .toLowerCase()
      .includes(search),
    documentToPlainTextString(e.responsibilities as Document)
      .toLowerCase()
      .includes(search),
    generateExperienceTimeline(e).toLowerCase().includes(search),
    e.projects.some((project) => project.title.toLowerCase().includes(search)),
    e.articles.some((article) => article.title.toLowerCase().includes(search)),
    e.tags.some((tag) => tag.title.toLowerCase().includes(search)),
  ];

  const result = matches.includes(true);
  searchCache[e.id][search] = result;
  return result;
};

export const useFilteredExperience = (): ResolvedExperience[] => {
  const experience = useSortedExperience(true);

  const search = useSelector(getExperienceSearch);
  const normalizedSearch = search.toLowerCase();
  const projectFilter = useSelector(getExperienceProjectFilter);
  const tagFilter = useSelector(getExperienceTagFilter);

  return experience.filter((e) => {
    if (!checkProjects(e, projectFilter)) return false;
    if (!checkTags(e, tagFilter)) return false;
    if (!checkSearch(e, normalizedSearch)) return false;

    return true;
  });
};

export function useSortedExperience(resolve: true): ResolvedExperience[];
export function useSortedExperience(resolve: false): Experience[];
export function useSortedExperience(): Experience[];
export function useSortedExperience(
  resolve?: boolean
): (ResolvedExperience | Experience)[] {
  const sort = useSelector(getExperienceSort);
  const sorted = sortExperience(sort);
  if (!resolve) return sorted;

  return sorted.reduce((arr, a) => {
    const exp = getSingleExperience(a.id);
    if (exp) arr.push(exp);
    return arr;
  }, [] as ResolvedExperience[]);
}

export const sortExperience = createSorter<ExperienceSort, Experience>(
  {
    Default: (a, b) => {
      const sorted = getDefaultSortedExperience();
      const aIndex = sorted.indexOf(a.id);
      const bIndex = sorted.indexOf(b.id);

      return aIndex - bIndex;
    },
    Alphabetically: (a, b) => {
      const aTitle = generateExperienceTitle(a).toLowerCase();
      const bTitle = generateExperienceTitle(b).toLowerCase();

      return aTitle.localeCompare(bTitle);
    },
    Latest: (a, b) => sortByDate(a, b),
    Earliest: (a, b) => sortByDate(a, b, -1),
  },
  getExperience()
);
