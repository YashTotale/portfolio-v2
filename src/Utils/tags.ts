import { TagsSort } from "../Redux/tags.slice";
import { getExperienceRelated } from "./experience";
import {
  ArticleFields,
  ExperienceFields,
  ProjectFields,
  TagFields,
} from "./types";

export const getTagProjects = (
  id: string,
  projects: ProjectFields[]
): ProjectFields[] =>
  projects.filter((p) => p.tags.some((tag) => tag.sys.id === id));

export const getTagArticles = (
  id: string,
  articles: ArticleFields[]
): ArticleFields[] =>
  articles.filter((a) => a.tags.some((tag) => tag.sys.id === id));

interface TagRelated {
  relatedProjects: ProjectFields[];
  relatedArticles: ArticleFields[];
  relatedExperience: ExperienceFields[];
}

export const getTagRelated = (
  fields: TagFields,
  experience: ExperienceFields[],
  projects: ProjectFields[],
  articles: ArticleFields[]
): TagRelated => {
  const relatedProjects = getTagProjects(fields.id, projects);

  const relatedArticles = getTagArticles(fields.id, articles);

  const relatedExperience = experience.filter((exp) => {
    const { tags } = getExperienceRelated(
      exp,
      relatedProjects,
      relatedArticles,
      [fields]
    );

    return tags.some((tag) => tag.id === fields.id);
  });

  return {
    relatedProjects,
    relatedArticles,
    relatedExperience,
  };
};

const sortCache: Record<TagsSort, TagFields[] | null> = {
  Alphabetically: null,
  "Most Related Experience": null,
  "Most Related Projects": null,
  "Most Related Articles": null,
};

export const sortTags = (
  sort: TagsSort,
  filteredTags: TagFields[],
  experience: ExperienceFields[] | null,
  projects: ProjectFields[] | null,
  articles: ArticleFields[] | null
): TagFields[] => {
  switch (sort) {
    case "Alphabetically": {
      if (sortCache.Alphabetically) return sortCache.Alphabetically;
      const toSort = [...filteredTags];

      const sorted = toSort.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();

        return aTitle.localeCompare(bTitle);
      });

      sortCache.Alphabetically = sorted;
      return sorted;
    }

    case "Most Related Experience": {
      if (sortCache["Most Related Experience"])
        return sortCache["Most Related Experience"];
      const toSort = [...filteredTags];

      if (experience === null || projects === null || articles === null)
        return toSort;

      const sorted = toSort.sort((a, b) => {
        const aRelated = getTagRelated(a, experience, projects, articles);
        const bRelated = getTagRelated(b, experience, projects, articles);

        return (
          bRelated.relatedExperience.length - aRelated.relatedExperience.length
        );
      });

      sortCache["Most Related Experience"] = sorted;
      return sorted;
    }

    case "Most Related Projects": {
      if (sortCache["Most Related Projects"])
        return sortCache["Most Related Projects"];
      const toSort = [...filteredTags];

      if (projects === null) return toSort;

      const sorted = toSort.sort((a, b) => {
        const aProjects = getTagProjects(a.id, projects);
        const bProjects = getTagProjects(b.id, projects);

        return bProjects.length - aProjects.length;
      });

      sortCache["Most Related Projects"] = sorted;
      return sorted;
    }

    case "Most Related Articles": {
      if (sortCache["Most Related Articles"])
        return sortCache["Most Related Articles"];
      const toSort = [...filteredTags];

      if (articles === null) return toSort;

      const sorted = toSort.sort((a, b) => {
        const aArticles = getTagArticles(a.id, articles);
        const bArticles = getTagArticles(b.id, articles);

        return bArticles.length - aArticles.length;
      });

      sortCache["Most Related Articles"] = sorted;
      return sorted;
    }

    default: {
      return filteredTags;
    }
  }
};
