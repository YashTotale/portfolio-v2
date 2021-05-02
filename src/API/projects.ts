// Internals
import client from "./client";
import Cache from "./cache";
import { Projects, ProjectFields } from "../Utils/types";

const ProjectsCache = new Cache();

const CACHE_KEYS = {
  projects: "projects",
} as const;

export const getProjects = async (): Promise<Projects> => {
  const cached = ProjectsCache.get<Projects>(CACHE_KEYS.projects);

  if (cached) return cached;

  const queriedProjects = await client.getEntries({
    content_type: "project",
  });

  const projects = queriedProjects.items.reduce(
    (obj, project) => ({
      ...obj,
      [project.sys.id]: project.fields as ProjectFields,
    }),
    {} as Projects
  );

  ProjectsCache.set(CACHE_KEYS.projects, projects);

  return projects;
};
