// Externals
import { createClient } from "contentful";
import Logger from "@hack4impact/logger";

// Internals
import { Dict, writeData } from "./helpers";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
});

const getContent = () => {
  const contentTypes = [
    "experience",
    "education",
    "project",
    "article",
    "tag",
    "certification",
    "badge",
    "provider",
    "book",
    "main",
  ];

  return Promise.all(
    contentTypes.map(async (type) => {
      const parsed: Dict = {};

      const recurse = async (skip = 0) => {
        const entries = await client.getEntries({
          content_type: type,
          include: 0,
          skip,
        });

        entries.items.forEach((entry) => {
          parsed[entry.sys.id] = {
            ...(entry.fields as Dict),
            id: entry.sys.id,
          };
        });

        if (entries.total > entries.limit + entries.skip) {
          await recurse(entries.limit + entries.skip);
        }
      };

      await recurse();
      await writeData(parsed, type);
    })
  );
};

const getAssets = async () => {
  const parsed: Dict = {};

  const recurse = async (skip = 0) => {
    const assets = await client.getAssets({ skip });

    assets.items.forEach((asset) => {
      parsed[asset.sys.id] = asset.fields;
    });

    if (assets.total > assets.limit + assets.skip) {
      await recurse(assets.limit + assets.skip);
    }
  };

  await recurse();
  await writeData(parsed, "assets");
};

const getData = async (): Promise<void> => {
  Logger.log("Fetching data...");

  await Promise.all([getContent(), getAssets()]);

  Logger.success("Successfully fetched data!");
  Logger.line();
};

export default getData;
