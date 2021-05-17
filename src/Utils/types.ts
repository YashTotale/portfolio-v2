// Externals
import { Asset, Entry, EntryFields } from "contentful";

export interface TagFields {
  id: string;
  title: EntryFields.Text;
  link?: EntryFields.Text;
  darkIcon: Asset;
  lightIcon: Asset;
}

type TagFieldsWithoutID = Omit<TagFields, "id">;

export interface ProjectFields {
  id: string;
  title: EntryFields.Text;
  description: EntryFields.RichText;
  image: Asset;
  start: EntryFields.Text;
  end: EntryFields.Text;
  link?: EntryFields.Text;
  github?: EntryFields.Text;
  associated?: Entry<ExperienceFieldsWithoutID>;
  tags: Entry<TagFieldsWithoutID>[];
}

export interface ExperienceFields {
  id: string;
  title: EntryFields.Text;
  role: EntryFields.Text;
  type: "Organization" | "Company" | "Club";
  description: EntryFields.RichText;
  responsibilities: EntryFields.RichText;
  image: Asset;
  start: EntryFields.Text;
  end?: EntryFields.Text;
  link?: EntryFields.Text;
  github?: EntryFields.Text;
}

type ExperienceFieldsWithoutID = Omit<ExperienceFields, "id">;

export interface ArticleFields {
  id: string;
  title: EntryFields.Text;
  description: EntryFields.RichText;
  link: EntryFields.Text;
  published: EntryFields.Date;
  image: Asset;
}
