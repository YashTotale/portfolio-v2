// Externals
import { Asset, Entry, EntryFields } from "contentful";

export interface TagFields {
  title: EntryFields.Symbol;
  link: EntryFields.Symbol;
  darkIcon: Asset;
  lightIcon: Asset;
}

export type Tags = Record<string, TagFields>;

export interface ProjectFields {
  title: EntryFields.Symbol;
  description: EntryFields.RichText;
  image: Asset;
  start: EntryFields.Symbol;
  end: EntryFields.Symbol;
  link?: EntryFields.Symbol;
  github?: EntryFields.Symbol;
  tags: Entry<TagFields>[];
}

export type Projects = Record<string, ProjectFields>;
