// Externals
import { Asset } from "contentful";

// Internals
import {
  RawExperience,
  RawProject,
  RawTag,
  RawArticle,
  RawMain,
  RawEducation,
  RawProvider,
  RawCertification,
} from "../../scripts/data/helpers";

export type Main = Omit<
  RawMain,
  | "sortedExperience"
  | "sortedEducation"
  | "sortedProjects"
  | "sortedArticles"
  | "educationImage"
> & {
  sortedExperience: string[];
  sortedEducation: string[];
  sortedProjects: string[];
  sortedArticles: string[];
  educationImage: string;
};

export interface Badge {
  title: string;
  source: string;
  url: string;
  id: string;
}

export type Experience = Omit<
  RawExperience,
  "lightImage" | "darkImage" | "tags"
> & {
  lightImage: string;
  darkImage: string;
  projects: string[];
  articles: string[];
  tags: string[];
};

export type ResolvedExperience = Omit<
  Experience,
  "lightImage" | "darkImage" | "projects" | "articles" | "tags"
> & {
  lightImage: Asset["fields"];
  darkImage: Asset["fields"];
  projects: Project[];
  articles: Article[];
  tags: Tag[];
};

export type Education = Omit<
  RawEducation,
  "provider" | "certificate" | "tags"
> & {
  provider?: string;
  certificate?: string;
  tags: string[];
};

export type ResolvedEducation = Omit<
  Education,
  "provider" | "certificate" | "tags"
> & {
  provider?: Provider;
  certificate?: Asset["fields"];
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
  education: string[];
  projects: string[];
  articles: string[];
};

export type ResolvedTag = Omit<
  Tag,
  | "darkIcon"
  | "lightIcon"
  | "experience"
  | "education"
  | "projects"
  | "articles"
> & {
  darkIcon: Asset["fields"];
  lightIcon: Asset["fields"];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  articles: Article[];
};

export type Certification = Omit<RawCertification, "provider" | "tags"> & {
  provider: string;
  tags: string[];
};

export type ResolvedCertification = Omit<Certification, "provider" | "tags"> & {
  provider: ResolvedProvider;
  tags: ResolvedTag[];
};

export type Provider = Omit<RawProvider, "image"> & {
  image: string;
};

export type ResolvedProvider = Omit<Provider, "image"> & {
  image: Asset["fields"];
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
  authorImage: string;
  datesRead?: string[];
  rating?: number;
  avgRating: number;
  numRatings: number;
  pages?: number;
  numReviews: number;
  id: string;
}
