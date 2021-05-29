import { sortByDate } from "./funcs";
import {
  ArticleFields,
  ExperienceFields,
  ProjectFields,
  TagFields,
} from "./types";
import { ExperienceSort } from "../Redux/experience.slice";

interface ExperienceRelated {
  projects: ProjectFields[];
  articles: ArticleFields[];
  tags: TagFields[];
}

export const getExperienceRelated = (
  experience: ExperienceFields,
  projects: ProjectFields[],
  articles: ArticleFields[],
  allTags: TagFields[]
): ExperienceRelated => {
  const { id, tags } = experience;

  const relatedProjects = projects.filter((p) => p.associated?.sys.id === id);
  const relatedArticles = articles.filter((a) => a.associated?.sys.id === id);

  const relatedTags = allTags.filter((tag) => {
    if (
      relatedProjects.some((project) =>
        project.tags.some((t) => t.sys.id === tag.id)
      )
    )
      return true;

    if (
      relatedArticles.some((article) =>
        article.tags.some((t) => t.sys.id === tag.id)
      )
    )
      return true;

    if (tags?.some((t) => t.sys.id === tag.id)) return true;

    return false;
  });

  return {
    projects: relatedProjects,
    articles: relatedArticles,
    tags: relatedTags,
  };
};

export const sortExperience = (
  sort: ExperienceSort,
  filteredExperience: ExperienceFields[]
): ExperienceFields[] => {
  switch (sort) {
    case "Latest": {
      return filteredExperience.sort((a, b) => sortByDate(a, b, 1));
    }
    case "Earliest": {
      return filteredExperience.sort((a, b) => sortByDate(a, b, -1));
    }
    default: {
      return filteredExperience;
    }
  }
};
