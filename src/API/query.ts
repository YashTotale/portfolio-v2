// Internals
import client from "./client";

const query = async <T>(contentType: string): Promise<T> => {
  const queriedObjects = await client.getEntries({
    content_type: contentType,
  });

  const objects = queriedObjects.items.reduce(
    (obj, objects) => ({
      ...obj,
      [objects.sys.id]: objects.fields,
    }),
    {} as T
  );

  return objects;
};

export default query;
