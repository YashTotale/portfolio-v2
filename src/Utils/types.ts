// Externals
import { Asset, Entry, EntryFields } from "contentful";

export interface TagFields {
  title: EntryFields.Text;
  link?: EntryFields.Text;
  darkIcon: Asset;
  lightIcon: Asset;
}

export type Tags = Record<string, TagFields>;

export interface ProjectFields {
  title: EntryFields.Text;
  description: EntryFields.RichText;
  image: Asset;
  start: EntryFields.Text;
  end: EntryFields.Text;
  link?: EntryFields.Text;
  github?: EntryFields.Text;
  tags: Entry<TagFields>[];
}

export type Projects = Record<string, ProjectFields>;

export interface ExperienceFields {
  title: EntryFields.Text;
  role: EntryFields.Text;
  type: "Organization" | "Company" | "Club";
  description: EntryFields.RichText;
  image: Asset;
  start: EntryFields.Text;
  end?: EntryFields.Text;
  link?: EntryFields.Text;
  github?: EntryFields.Text;
}

export type Experience = Record<string, ExperienceFields>;

export interface ArticleFields {
  title: EntryFields.Text;
  description: EntryFields.RichText;
  link: EntryFields.Text;
  published: EntryFields.Date;
  image: Asset;
}

export type Articles = Record<string, ArticleFields>;
