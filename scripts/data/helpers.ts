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

export interface RawMain {
  description: EntryFields.RichText;
  sortedExperience: RawLink[];
  sortedEducation: RawLink[];
  sortedProjects: RawLink[];
  sortedArticles: RawLink[];
  educationImage: RawLink;
}

export interface RawExperience {
  id: string;
  title: EntryFields.Text;
  role: EntryFields.Text;
  type: "Organization" | "Company" | "Club";
  slug: EntryFields.Text;
  description: EntryFields.RichText;
  responsibilities: EntryFields.RichText;
  lightImage: RawLink;
  darkImage: RawLink;
  start: EntryFields.Text;
  end?: EntryFields.Text;
  link?: EntryFields.Text;
  github?: EntryFields.Text;
  linkedin?: EntryFields.Text;
  tags?: RawLink[];
}

export interface RawEducation {
  id: string;
  title: EntryFields.Text;
  type: "Class" | "Online Course";
  slug: EntryFields.Text;
  description: EntryFields.RichText;
  provider?: RawLink;
  certificate?: RawLink;
  start: EntryFields.Text;
  end?: EntryFields.Text;
  link?: EntryFields.Text;
  github?: EntryFields.Text;
  tags: RawLink[];
}

export interface RawProject {
  id: string;
  title: EntryFields.Text;
  description: EntryFields.RichText;
  slug: EntryFields.Text;
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
  slug: EntryFields.Text;
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
  slug: EntryFields.Text;
  categories?: string[];
  description?: EntryFields.RichText;
  darkIcon: RawLink;
  lightIcon: RawLink;
  link?: EntryFields.Text;
}

export interface RawCertification {
  id: string;
  title: string;
  date: string;
  link: string;
  provider: RawLink;
  tags?: RawLink[];
}

export interface RawProvider {
  id: string;
  title: string;
  link?: string;
  image: RawLink;
}

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
