import { TagsSort } from "../Redux/tags.slice";
import { ProjectFields, TagFields } from "./types";

export const getTagProjects = (
  id: string,
  projects: ProjectFields[]
): ProjectFields[] => {
  return projects.filter((p) => p.tags.some((tag) => tag.sys.id === id));
};

const sortCache: Record<TagsSort, TagFields[] | null> = {
  Alphabetically: null,
  "Most Projects": null,
};

export const sortTags = (
  sort: TagsSort,
  filteredTags: TagFields[],
  projects: ProjectFields[] | null
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
    case "Most Projects": {
      if (sortCache["Most Projects"]) return sortCache["Most Projects"];
      const toSort = [...filteredTags];

      if (projects === null) return toSort;

      const sorted = toSort.sort((a, b) => {
        const aProjects = getTagProjects(a.id, projects);
        const bProjects = getTagProjects(b.id, projects);

        return bProjects.length - aProjects.length;
      });

      sortCache["Most Projects"] = sorted;
      return sorted;
    }
    default: {
      return filteredTags;
    }
  }
};
