// Internal Imports
import { Education, ResolvedEducation, Tag } from "../types";
import { getRawTag } from "./tags";

// Data Imports
import education from "../../Data/education.json";

export const getEducation = (): Education[] => {
  return (Object.values(education) as unknown) as Education[];
};

export const getSingleEducation = (
  id: string,
  isSlug = false
): ResolvedEducation | null => {
  const single = getRawEducation(id, isSlug);
  if (!single) return null;

  const tags = single.tags.reduce((arr, tag) => {
    const resolved = getRawTag(tag);
    if (resolved) arr.push(resolved);
    return arr;
  }, [] as Tag[]);

  return { ...single, tags };
};

export const getRawEducation = (
  identifier: string,
  isSlug = false
): Education | null => {
  const all = (education as unknown) as Record<string, Education>;
  const single = !isSlug
    ? all[identifier]
    : Object.values(all).find((e) => e.slug === identifier);

  if (!single) return null;
  return single;
};
