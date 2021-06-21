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
  getExperienceSort,
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

export const useSortedExperience = (): Experience[] => {
  const sort = useSelector(getExperienceSort);
  return sortExperience(sort);
};

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
