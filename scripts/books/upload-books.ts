// Externals
import { config } from "dotenv-safe";
import { createClient } from "contentful-management";
import { Environment } from "contentful-management/dist/typings/export-types";
import Logger from "@hack4impact/logger";
import { readdir, readFile } from "fs/promises";
import { join, basename } from "path";
import merge from "lodash.merge";

config();

type BookData = Record<string, unknown>;

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN ?? "",
});

const BOOKS_PATH = join(__dirname, "data", "books");
const BOOKS: Record<string, BookData> = {};

const readBooks = async () => {
  const files = await readdir(BOOKS_PATH);

  for await (const file of files) {
    const filePath = join(BOOKS_PATH, file);
    const data = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(data);
    BOOKS[file] = parsed;
  }
};

const getEnv = async () => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID ?? "");
  return space.getEnvironment("master");
};

const createField = (value: unknown) => ({ "en-US": value });

const uploadBook = async (env: Environment, id: string, data: BookData) => {
  Logger.log(`Uploading ${id}...`);
  const fields: Record<string, unknown> = {
    title: createField(data["book_title"]),
    link: createField(data["book_url"]),
    image: createField(data["book_image"]),
    shelves: createField(data.shelves),
    genres: createField(data.genres),
    author: createField(data.author),
    authorLink: createField(data["author_url"]),
    datesRead: createField(data["dates_read"]),
    avgRating: createField(data["average_rating"]),
    numRatings: createField(data["num_ratings"]),
    numReviews: createField(data["num_reviews"]),
  };
  if (typeof data.rating === "number") {
    fields.rating = createField(data.rating);
  }
  if (typeof data["book_series"] === "string") {
    fields.series = createField(data["book_series"]);
  }
  if (typeof data["book_series_uri"] === "string") {
    fields.seriesLink = createField(data["book_series_uri"]);
  }
  if (typeof data["book_series"] === "string") {
    fields.series = createField(data["book_series"]);
  }
  if (typeof data["year_first_published"] === "string") {
    fields.yearPublished = createField(data["year_first_published"]);
  }
  if (typeof data["num_pages"] === "number") {
    fields.pages = createField(data["num_pages"]);
  }

  try {
    let entry = await env.getEntry(id);
    entry.fields = merge(entry.fields, fields);
    entry = await entry.update();
    await entry.publish();
    Logger.coloredLog("FgBlue", `Updated ${id}`);
  } catch (e) {
    const entry = await env.createEntryWithId("book", id, {
      fields,
    });
    await entry.publish();
    Logger.success(`Created ${id}`);
  }
};

const upload = async () => {
  await readBooks();
  const env = await getEnv();
  for (const book in BOOKS) {
    const id = basename(book, ".json");
    await uploadBook(env, id, BOOKS[book]);
  }
};

upload();
