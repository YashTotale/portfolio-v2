// Internal Imports
import { Article, Experience, Project, ResolvedTag, Tag } from "../types";
import { getRawExperience } from "./experience";
import { getRawProject } from "./projects";
import { getRawArticle } from "./articles";
import { getAsset } from "./assets";

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

const sortCache: Record<TagsSort, Tag[] | null> = {
  Alphabetically: null,
  "Most Related Experience": null,
  "Most Related Projects": null,
  "Most Related Articles": null,
};

export const useSortedTags = (): Tag[] => {
  const tags = getTags();
  const sort = useSelector(getTagsSort);

  if (sortCache[sort]) return sortCache[sort] as Tag[];

  const toSort = [...tags];
  let sorted = tags;

  switch (sort) {
    case "Alphabetically": {
      sorted = toSort.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();

        return aTitle.localeCompare(bTitle);
      });
      break;
    }

    case "Most Related Experience": {
      sorted = toSort.sort((a, b) => b.experience.length - a.experience.length);
      break;
    }

    case "Most Related Projects": {
      sorted = toSort.sort((a, b) => b.projects.length - a.projects.length);
      break;
    }

    case "Most Related Articles": {
      sorted = toSort.sort((a, b) => b.articles.length - a.articles.length);
      break;
    }
  }

  sortCache[sort] = sorted;
  return sorted;
};
