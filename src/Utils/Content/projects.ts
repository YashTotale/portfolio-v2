// Internal Imports
import { sortByDate } from "../funcs";
import { Badge, Project, ResolvedProject, Tag } from "../types";
import { getAsset } from "./assets";
import { getRawTag } from "./tags";
import { getRawBadge } from "./badges";

// Redux Imports
import { useSelector } from "react-redux";
import { getProjectsSort, ProjectsSort } from "../../Redux/projects.slice";

// Data Imports
import projects from "../../Data/project.json";
import { getRawExperience } from "./experience";

const sortCache: Record<ProjectsSort, Project[] | null> = {
  Newest: null,
  Oldest: null,
};

export const getProjects = (): Project[] => {
  return (Object.values(projects) as unknown) as Project[];
};

export const getProject = (id: string): ResolvedProject | null => {
  const single = getRawProject(id);
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
};

export const getRawProject = (id: string): Project | null => {
  const all = (projects as unknown) as Record<string, Project>;
  const single = all[id];

  if (!single) return null;
  return single;
};

export const useSortedProjects = (): Project[] => {
  const projects = getProjects();
  const sort = useSelector(getProjectsSort);

  if (sortCache[sort]) return sortCache[sort] as Project[];

  const toSort = [...projects];
  let sorted = projects;

  switch (sort) {
    case "Newest": {
      sorted = toSort.sort((a, b) => sortByDate(a, b, 1));
      break;
    }
    case "Oldest": {
      sorted = toSort.sort((a, b) => sortByDate(a, b, -1));
      break;
    }
  }

  sortCache[sort] = sorted;
  return sorted;
};
