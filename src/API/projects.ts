// Externals
import { FieldType } from "contentful";

// Internals
import client from "./client";
import Cache from "./cache";

const ProjectsCache = new Cache();

const CACHE_KEYS = {
  fields: "project-fields",
} as const;

type ProjectFields = Record<string, FieldType>;

const getProjectFields = async (): Promise<ProjectFields> => {
  const cached = ProjectsCache.get<ProjectFields>(CACHE_KEYS.fields);

  if (cached) return cached;

  const contentType = await client.getContentType("project");

  const fields = contentType.fields.reduce(
    (obj, field) => ({ ...obj, [field.id]: field.type }),
    {} as ProjectFields
  );

  ProjectsCache.set(CACHE_KEYS.fields, fields);

  return fields;
};

const getProjects = async () => {
  const fields = await getProjectFields();
};

export default getProjects;
