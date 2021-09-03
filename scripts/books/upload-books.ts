// Externals
import { config } from "dotenv-safe";
import { createClient } from "contentful-management";
import { Environment } from "contentful-management/dist/typings/export-types";
import Logger from "@hack4impact/logger";
import { readdir, readFile } from "fs/promises";
import { join, basename } from "path";

config();

type BookData = Record<string, unknown> & {
  author: Record<string, unknown>;
};

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN ?? "",
});

const BOOKS_PATH = join(__dirname, "data", "books");
const BOOKS: Record<string, BookData> = {};

const fetchBooks = async () => {
  const files = await readdir(BOOKS_PATH);

  for await (const file of files) {
    const filePath = join(BOOKS_PATH, file);
    const data = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(data);
    const id = basename(file, ".json");
    BOOKS[id] = parsed;
  }
};

const getEnv = async () => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID ?? "");
  return space.getEnvironment("master");
};

const cleanUpBooks = async (env: Environment) => {
  const books = await env.getEntries({
    content_type: "book",
  });
  for (const book of books.items) {
    const id = book.sys.id;

    Logger.log(`Deleting ${id}...`);

    if (book.isPublished()) {
      await book.unpublish();
    }
    await book.delete();

    Logger.coloredLog("FgYellow", `Deleted ${id}`);
  }
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
    author: createField(data.author["author_name"]),
    authorLink: createField(data.author["author_url"]),
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
  if (typeof data.author["author_image"] === "string") {
    fields.authorImage = createField(data.author["author_image"]);
  }

  const entry = await env.createEntryWithId("book", id, {
    fields,
  });
  await entry.publish();

  Logger.success(`Created ${id}`);
};

const upload = async () => {
  await fetchBooks();
  const env = await getEnv();

  await cleanUpBooks(env);
  Logger.line();

  for (const book in BOOKS) {
    await uploadBook(env, book, BOOKS[book]);
  }
};

upload();
