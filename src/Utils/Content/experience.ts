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

export const getSingleExperience = (id: string): ResolvedExperience | null => {
  const single = getRawExperience(id);
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

export const getRawExperience = (id: string): Experience | null => {
  const all = (experience as unknown) as Record<string, Experience>;
  const single = all[id];

  if (!single) return null;
  return single;
};

export const generateExperienceTitle = (
  exp: Experience | ResolvedExperience
): string => {
  return `${exp.role} @ ${exp.title}`;
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
    e.title.toLowerCase().includes(search),
    documentToPlainTextString(e.description as Document)
      .toLowerCase()
      .includes(search),
    documentToPlainTextString(e.responsibilities as Document)
      .toLowerCase()
      .includes(search),
    e.type.toLowerCase().includes(search),
    e.role.toLowerCase().includes(search),
    e.start.toLowerCase().includes(search),
    e.end?.toLowerCase().includes(search),
    e.link?.toLowerCase().includes(search),
    e.github?.toLowerCase().includes(search),
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
    Alphabetically: (a, b) => {
      const aTitle = generateExperienceTitle(a).toLowerCase();
      const bTitle = generateExperienceTitle(b).toLowerCase();

      return aTitle.localeCompare(bTitle);
    },
    Latest: (a, b) => sortByDate(a, b),
    Earliest: (a, b) => sortByDate(a, b, -1),
  },
  getExperience
);
