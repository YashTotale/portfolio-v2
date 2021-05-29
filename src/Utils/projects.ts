import { sortByDate } from "./funcs";
import { ProjectFields } from "./types";
import { ProjectsSort } from "../Redux/projects.slice";

const sortCache: Record<ProjectsSort, ProjectFields[] | null> = {
  Newest: null,
  Oldest: null,
};

export const sortProjects = (
  sort: ProjectsSort,
  filteredProjects: ProjectFields[]
): ProjectFields[] => {
  switch (sort) {
    case "Newest": {
      if (sortCache.Newest) return sortCache.Newest;
      const toSort = [...filteredProjects];

      const sorted = toSort.sort((a, b) => sortByDate(a, b, 1));

      sortCache.Newest = sorted;
      return sorted;
    }
    case "Oldest": {
      if (sortCache.Oldest) return sortCache.Oldest;
      const toSort = [...filteredProjects];

      const sorted = toSort.sort((a, b) => sortByDate(a, b, -1));

      sortCache.Oldest = sorted;
      return sorted;
    }
    default: {
      return filteredProjects;
    }
  }
};
