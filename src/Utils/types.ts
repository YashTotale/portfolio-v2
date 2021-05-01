// Externals
import { Asset, EntryFields } from "contentful";

export interface TagFields {
  title: EntryFields.Symbol;
  link: EntryFields.Symbol;
  darkIcon: EntryFields.Link<Asset>;
  lightIcon: EntryFields.Link<Asset>;
}

export interface ProjectFields {
  title: EntryFields.Symbol;
  description: EntryFields.RichText;
  link: EntryFields.Symbol;
  image: EntryFields.Link<Asset>;
  start: EntryFields.Symbol;
  end: EntryFields.Symbol;
  sourceCode: EntryFields.Symbol;
  tags: EntryFields.Array<TagFields>;
}

export type Projects = Record<string, ProjectFields>;
