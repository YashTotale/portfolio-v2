// Externals
import { EntryFields, Sys } from "contentful";
import { format } from "prettier";
import { promises } from "fs";
import { join } from "path";

const { writeFile, readFile } = promises;

export type Dict<T = unknown> = Record<string, T>;

export interface RawLink {
  sys: Sys;
}

export interface RawExperience {
  id: string;
  title: EntryFields.Text;
  role: EntryFields.Text;
  type: "Organization" | "Company" | "Club";
  description: EntryFields.RichText;
  responsibilities: EntryFields.RichText;
  image: RawLink;
  start: EntryFields.Text;
  end?: EntryFields.Text;
  link?: EntryFields.Text;
  github?: EntryFields.Text;
  tags?: RawLink[];
}

export interface RawProject {
  id: string;
  title: EntryFields.Text;
  description: EntryFields.RichText;
  image: RawLink;
  start: EntryFields.Text;
  end?: EntryFields.Text;
  link?: EntryFields.Text;
  github?: EntryFields.Text;
  associated?: RawLink;
  tags: RawLink[];
  badges?: RawLink[];
}

export interface RawArticle {
  id: string;
  title: EntryFields.Text;
  description: EntryFields.RichText;
  link: EntryFields.Text;
  published: EntryFields.Date;
  image: RawLink;
  tags: RawLink[];
  associated?: RawLink;
}

export interface RawTag {
  id: string;
  title: EntryFields.Text;
  darkIcon: RawLink;
  lightIcon: RawLink;
  link?: EntryFields.Text;
}

export interface Main {
  description: EntryFields.RichText;
}

export type Experience = Omit<RawExperience, "image" | "tags"> & {
  image: string;
  projects: string[];
  articles: string[];
  tags: string[];
};

export type Project = Omit<
  RawProject,
  "image" | "tags" | "badges" | "associated"
> & {
  image: string;
  tags: string[];
  badges?: string[];
  associated?: string;
};

export type Article = Omit<RawArticle, "image" | "tags" | "associated"> & {
  image: string;
  tags: string[];
  associated?: string;
};

export type Tag = Omit<RawTag, "darkIcon" | "lightIcon"> & {
  darkIcon: string;
  lightIcon: string;
  experience: string[];
  projects: string[];
  articles: string[];
};

export const ROOT_DIR = join(__dirname, "..", "..");
export const DATA_DIR = join(ROOT_DIR, "src", "Data");

export const writeData = async (
  data: unknown,
  fileName: string
): Promise<void> => {
  const stringified = JSON.stringify(data);
  const formatted = format(stringified, {
    parser: "json-stringify",
  });

  const file = join(DATA_DIR, `${fileName}.json`);

  await writeFile(file, formatted);
};

export const readData = async <T = unknown>(
  fileName: string
): Promise<Dict<T>> => {
  const file = join(DATA_DIR, `${fileName}.json`);
  const stringified = await readFile(file, "utf-8");

  const parsed = JSON.parse(stringified);
  return parsed;
};
