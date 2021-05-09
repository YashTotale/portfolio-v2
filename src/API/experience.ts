// Internals
import client from "./client";
import Cache from "./cache";
import { Experience, ExperienceFields } from "../Utils/types";

const ExperienceCache = new Cache();

const CACHE_KEYS = {
  experience: "experience",
} as const;

export const getExperience = async (): Promise<Experience> => {
  const cached = ExperienceCache.get<Experience>(CACHE_KEYS.experience);

  if (cached) return cached;

  const queriedExperience = await client.getEntries({
    content_type: "experience",
  });

  const experience = queriedExperience.items.reduce(
    (obj, experience) => ({
      ...obj,
      [experience.sys.id]: experience.fields as ExperienceFields,
    }),
    {} as Experience
  );

  ExperienceCache.set(CACHE_KEYS.experience, experience);

  return experience;
};
