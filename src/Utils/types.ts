// Externals
import { Asset, EntryFields } from "contentful";

// Internals
import {
  RawExperience,
  RawProject,
  RawTag,
  RawArticle,
} from "../../scripts/data/helpers";

export interface Main {
  description: EntryFields.RichText;
}
export interface Badge {
  title: string;
  source: string;
  url: string;
  id: string;
}

export type Experience = Omit<RawExperience, "image" | "tags"> & {
  image: string;
  projects: string[];
  articles: string[];
  tags: string[];
};

export type ResolvedExperience = Omit<
  Experience,
  "image" | "projects" | "articles" | "tags"
> & {
  image: Asset["fields"];
  projects: Project[];
  articles: Article[];
  tags: Tag[];
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

export type ResolvedProject = Omit<
  Project,
  "image" | "associated" | "badges" | "tags"
> & {
  image: Asset["fields"];
  associated?: Experience;
  badges?: Badge[];
  tags: Tag[];
};

export type Article = Omit<RawArticle, "image" | "tags" | "associated"> & {
  image: string;
  tags: string[];
  associated?: string;
};

export type ResolvedArticle = Omit<Article, "image" | "tags" | "associated"> & {
  image: Asset["fields"];
  tags: Tag[];
  associated?: Experience;
};

export type Tag = Omit<RawTag, "darkIcon" | "lightIcon"> & {
  darkIcon: string;
  lightIcon: string;
  experience: string[];
  projects: string[];
  articles: string[];
};

export type ResolvedTag = Omit<
  Tag,
  "darkIcon" | "lightIcon" | "experience" | "projects" | "articles"
> & {
  darkIcon: Asset["fields"];
  lightIcon: Asset["fields"];
  experience: Experience[];
  projects: Project[];
  articles: Article[];
};

export interface Book {
  title: string;
  link: string;
  image: string;
  yearPublished?: string;
  series?: string;
  seriesLink?: string;
  genres: string[];
  shelves: string[];
  author: string;
  authorLink: string;
  datesRead?: string[];
  rating?: number;
  avgRating: number;
  numRatings: number;
  pages?: number;
  numReviews: number;
  id: string;
}
