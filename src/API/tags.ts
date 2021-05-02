// Internals
import client from "./client";
import Cache from "./cache";
import { TagFields, Tags } from "../Utils/types";

const TagsCache = new Cache();

const CACHE_KEYS = {
  tags: "tags",
} as const;

export const getTags = async (): Promise<Tags> => {
  const cached = TagsCache.get<Tags>(CACHE_KEYS.tags);

  if (cached) return cached;

  const queriedTags = await client.getEntries({
    content_type: "tag",
  });

  const tags = queriedTags.items.reduce(
    (obj, tag) => ({
      ...obj,
      [tag.sys.id]: tag.fields as TagFields,
    }),
    {} as Tags
  );

  TagsCache.set(CACHE_KEYS.tags, tags);

  return tags;
};
