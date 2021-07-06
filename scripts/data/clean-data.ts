// Externals
import Logger from "@hack4impact/logger";

// Internals
import {
  RawArticle,
  RawExperience,
  RawProject,
  RawLink,
  Dict,
  readData,
  writeData,
  RawTag,
  RawMain,
} from "./helpers";
import { Project, Article, Experience, Tag, Main } from "../../src/Utils/types";

const getId = (x: RawLink) => x.sys.id;

const cleanExperience = async (
  projects: Dict<Project>,
  articles: Dict<Article>
) => {
  const experience = await readData<RawExperience>("experience");

  const parsed = Object.entries(experience).reduce((obj, [id, fields]) => {
    const lightImage = getId(fields.lightImage);
    const darkImage = getId(fields.darkImage);
    const tags = fields.tags?.map(getId) ?? [];

    const relatedProjects = Object.values(projects).reduce((arr, project) => {
      if (project.associated === id) {
        return [...arr, project.id];
      }
      return arr;
    }, [] as string[]);

    const relatedArticles = Object.values(articles).reduce((arr, article) => {
      if (article.associated === id) {
        return [...arr, article.id];
      }
      return arr;
    }, [] as string[]);

    const relatedTags = [
      ...new Set([
        ...tags,
        ...relatedProjects.flatMap((id) => projects[id].tags),
        ...relatedArticles.flatMap((id) => articles[id].tags),
      ]),
    ];

    return {
      ...obj,
      [id]: {
        ...fields,
        tags: relatedTags,
        lightImage,
        darkImage,
        projects: relatedProjects,
        articles: relatedArticles,
      },
    };
  }, {} as Dict<Experience>);

  await writeData(parsed, "experience");
  return parsed;
};

const cleanProjects = async () => {
  const projects = await readData<RawProject>("project");

  const parsed = Object.entries(projects).reduce((obj, [id, fields]) => {
    const associated = fields.associated ? getId(fields.associated) : undefined;
    const image = getId(fields.image);
    const tags = fields.tags.map(getId);
    const badges = fields.badges?.map(getId);

    return { ...obj, [id]: { ...fields, associated, tags, image, badges } };
  }, {} as Dict<Project>);

  await writeData(parsed, "project");
  return parsed;
};

const cleanArticles = async () => {
  const articles = await readData<RawArticle>("article");

  const parsed = Object.entries(articles).reduce((obj, [id, fields]) => {
    const associated = fields.associated ? getId(fields.associated) : undefined;
    const image = getId(fields.image);
    const tags = fields.tags.map(getId);

    return { ...obj, [id]: { ...fields, associated, tags, image } };
  }, {} as Dict<Article>);

  await writeData(parsed, "article");
  return parsed;
};

const cleanTags = async (
  experience: Dict<Experience>,
  projects: Dict<Project>,
  articles: Dict<Article>
) => {
  const tags = await readData<RawTag>("tag");

  const parsed = Object.entries(tags).reduce((obj, [id, fields]) => {
    const darkIcon = getId(fields.darkIcon);
    const lightIcon = getId(fields.lightIcon);

    const relatedExperience = Object.values(experience).reduce((arr, exp) => {
      if (exp.tags.includes(id)) {
        return [...arr, exp.id];
      }
      return arr;
    }, [] as string[]);

    const relatedProjects = Object.values(projects).reduce((arr, project) => {
      if (project.tags.includes(id)) {
        return [...arr, project.id];
      }
      return arr;
    }, [] as string[]);

    const relatedArticles = Object.values(articles).reduce((arr, article) => {
      if (article.tags.includes(id)) {
        return [...arr, article.id];
      }
      return arr;
    }, [] as string[]);

    return {
      ...obj,
      [id]: {
        ...fields,
        darkIcon,
        lightIcon,
        experience: relatedExperience,
        projects: relatedProjects,
        articles: relatedArticles,
      },
    };
  }, {} as Dict<Tag>);

  await writeData(parsed, "tag");
  return parsed;
};

const cleanMain = async () => {
  const main = await readData<RawMain>("main");
  const single = Object.values(main)[0];

  const parsed: Main = {
    ...single,
    sortedExperience: single.sortedExperience.map(getId),
    sortedProjects: single.sortedProjects.map(getId),
    sortedArticles: single.sortedArticles.map(getId),
  };

  await writeData(parsed, "main");
};

const cleanData = async (): Promise<void> => {
  Logger.log("Cleaning data...");

  const [projects, articles] = await Promise.all([
    cleanProjects(),
    cleanArticles(),
    cleanMain(),
  ]);

  const experience = await cleanExperience(projects, articles);
  await cleanTags(experience, projects, articles);

  Logger.success("Successfully cleaned data!");
  Logger.line();
};

export default cleanData;
