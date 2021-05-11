// Internals
import client from "./client";

const query = async <T>(contentType: string): Promise<T[]> => {
  const queriedObjects = await client.getEntries({
    content_type: contentType,
  });

  const objects = queriedObjects.items.reduce((arr, obj) => {
    const toAdd = { ...(obj.fields as T), id: obj.sys.id } as T;

    return [...arr, toAdd];
  }, [] as T[]);

  return objects;
};

export default query;
