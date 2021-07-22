// External Imports
import { Document } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

// Internal Imports
import { createResolver, createSorter, sortByDate } from "../funcs";
import { Badge, Experience, Project, ResolvedProject, Tag } from "../types";
import { getDefaultSortedProjects } from "./main";
import { generateExperienceTitle, getRawExperience } from "./experience";
import { getAsset } from "./assets";
import { getRawTag } from "./tags";
import { getRawBadge } from "./badges";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getProjectsExperienceFilter,
  getProjectsSearch,
  getProjectsSort,
  getProjectsTagFilter,
  ProjectsSort,
} from "../../Redux/projects.slice";

// Data Imports
import projects from "../../Data/project.json";

export const getProjects = (): Project[] => {
  return (Object.values(projects) as unknown) as Project[];
};

export const getProject = createResolver(
  (id: string, isSlug = false): ResolvedProject | null => {
    const single = getRawProject(id, isSlug);
    if (!single) return null;

    const image = getAsset(single.image);

    const associated = getRawExperience(single.associated ?? "") ?? undefined;

    const badges = single?.badges?.reduce((arr, tag) => {
      const resolved = getRawBadge(tag);
      if (resolved) arr.push(resolved);
      return arr;
    }, [] as Badge[]);

    const tags = single.tags.reduce((arr, tag) => {
      const resolved = getRawTag(tag);
      if (resolved) arr.push(resolved);
      return arr;
    }, [] as Tag[]);

    return { ...single, image, associated, badges, tags };
  }
);

export const getRawProject = (
  identifier: string,
  isSlug = false
): Project | null => {
  const all = (projects as unknown) as Record<string, Project>;
  const single = !isSlug
    ? all[identifier]
    : Object.values(all).find((p) => p.slug === identifier);

  if (!single) return null;
  return single;
};

export const generateProjectTimeline = (
  project: Project | ResolvedProject
): string => {
  const start = project.start;
  let end = project.end;

  if (end === start) return start;

  if (!end) end = "Present";
  return `${start} - ${end}`;
};

export const checkExperience = (
  p: ResolvedProject,
  experiences: string[]
): boolean => {
  if (!experiences.length) return true;
  if (!p.associated) return false;

  return experiences.some(
    (exp) => generateExperienceTitle(p.associated as Experience) === exp
  );
};

export const checkTags = (p: ResolvedProject, tags: string[]): boolean => {
  if (!tags.length) return true;
  return tags.some((tag) => p.tags.some((t) => t.title === tag));
};

const searchCache: Record<string, Record<string, boolean>> = {};

export const checkSearch = (p: ResolvedProject, search: string): boolean => {
  if (!search.length) return true;
  if (!searchCache[p.id]) searchCache[p.id] = {};

  const cache = searchCache[p.id][search];
  if (typeof cache === "boolean") return cache;

  const matches: (boolean | undefined)[] = [
    p.title.toLowerCase().includes(search),
    documentToPlainTextString(p.description as Document)
      .toLowerCase()
      .includes(search),
    p.tags.some((tag) => tag.title.toLowerCase().includes(search)),
    p.associated &&
      generateExperienceTitle(p.associated).toLowerCase().includes(search),
    generateProjectTimeline(p).toLowerCase().includes(search),
  ];

  const result = matches.includes(true);
  searchCache[p.id][search] = result;
  return result;
};

export const useFilteredProjects = (): ResolvedProject[] => {
  const projects = useSortedProjects(true);

  const search = useSelector(getProjectsSearch);
  const normalizedSearch = search.toLowerCase();
  const experienceFilter = useSelector(getProjectsExperienceFilter);
  const tagFilter = useSelector(getProjectsTagFilter);

  return projects.filter((a) => {
    if (!checkExperience(a, experienceFilter)) return false;
    if (!checkTags(a, tagFilter)) return false;
    if (!checkSearch(a, normalizedSearch)) return false;

    return true;
  });
};

export function useSortedProjects(resolve: true): ResolvedProject[];
export function useSortedProjects(resolve: false): Project[];
export function useSortedProjects(): Project[];
export function useSortedProjects(
  resolve?: boolean
): (ResolvedProject | Project)[] {
  const sort = useSelector(getProjectsSort);
  const sorted = sortProjects(sort);
  if (!resolve) return sorted;

  return sorted.reduce((arr, p) => {
    const project = getProject(p.id);
    if (project) arr.push(project);
    return arr;
  }, [] as ResolvedProject[]);
}

export const sortProjects = createSorter<ProjectsSort, Project>(
  {
    Default: (a, b) => {
      const sorted = getDefaultSortedProjects();
      const aIndex = sorted.indexOf(a.id);
      const bIndex = sorted.indexOf(b.id);

      return aIndex - bIndex;
    },
    Alphabetically: (a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();

      return aTitle.localeCompare(bTitle);
    },
    Newest: (a, b) => sortByDate(a, b),
    Oldest: (a, b) => sortByDate(a, b, -1),
  },
  getProjects()
);
