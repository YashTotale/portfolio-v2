// Internal Imports
import { Article, Experience, Project, ResolvedTag, Tag } from "../types";
import { getRawExperience } from "./experience";
import { getRawProject } from "./projects";
import { getRawArticle } from "./articles";
import { getAsset } from "./assets";
import { createSorter } from "../funcs";

// Redux Imports
import { useSelector } from "react-redux";
import { getTagsSort, TagsSort } from "../../Redux/tags.slice";

// Data Imports
import tags from "../../Data/tag.json";

export const getTags = (): Tag[] => {
  return (Object.values(tags) as unknown) as Tag[];
};

export const getTag = (id: string): ResolvedTag | null => {
  const single = getRawTag(id);
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

export const getRawTag = (id: string): Tag | null => {
  const all = (tags as unknown) as Record<string, Tag>;
  const single = all[id];

  if (!single) return null;
  return single;
};

export const useSortedTags = (): Tag[] => {
  const sort = useSelector(getTagsSort);
  return sortTags(sort);
};

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
  getTags
);
