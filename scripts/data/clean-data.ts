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
  RawEducation,
  RawProvider,
  RawCertification,
} from "./helpers";
import {
  Project,
  Article,
  Experience,
  Tag,
  Main,
  Education,
  Provider,
  Certification,
} from "../../src/Utils/types";

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

const cleanEducation = async () => {
  const education = await readData<RawEducation>("education");

  const parsed = Object.entries(education).reduce((obj, [id, fields]) => {
    const tags = fields.tags.map(getId);
    const provider = fields.provider ? getId(fields.provider) : undefined;
    const certificate = fields.certificate
      ? getId(fields.certificate)
      : undefined;

    return { ...obj, [id]: { ...fields, provider, certificate, tags } };
  }, {} as Dict<Education>);

  await writeData(parsed, "education");
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
  education: Dict<Education>,
  projects: Dict<Project>,
  articles: Dict<Article>,
  certification: Dict<Certification>
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

    const relatedEducation = Object.values(education).reduce((arr, ed) => {
      if (ed.tags.includes(id)) {
        return [...arr, ed.id];
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

    const relatedCertification = Object.values(certification).reduce(
      (arr, certification) => {
        if (certification.tags.includes(id)) {
          return [...arr, certification.id];
        }
        return arr;
      },
      [] as string[]
    );

    return {
      ...obj,
      [id]: {
        ...fields,
        darkIcon,
        lightIcon,
        experience: relatedExperience,
        education: relatedEducation,
        projects: relatedProjects,
        articles: relatedArticles,
        certification: relatedCertification,
      },
    };
  }, {} as Dict<Tag>);

  await writeData(parsed, "tag");
  return parsed;
};

const cleanCertification = async () => {
  const certification = await readData<RawCertification>("certification");

  const parsed = Object.entries(certification).reduce((obj, [id, fields]) => {
    const provider = getId(fields.provider);
    const tags = fields.tags?.map(getId) || [];

    return {
      ...obj,
      [id]: {
        ...fields,
        provider,
        tags,
      },
    };
  }, {} as Dict<Certification>);

  await writeData(parsed, "certification");
  return parsed;
};

const cleanProviders = async (
  education: Dict<Education>,
  certification: Dict<Certification>
) => {
  const providers = await readData<RawProvider>("provider");

  const parsed = Object.entries(providers).reduce((obj, [id, fields]) => {
    const image = getId(fields.image);

    const relatedEducation = Object.values(education).reduce((arr, ed) => {
      if (ed.provider === id) {
        return [...arr, ed.id];
      }
      return arr;
    }, [] as string[]);

    const relatedCertification = Object.values(certification).reduce(
      (arr, certification) => {
        if (certification.provider === id) {
          return [...arr, certification.id];
        }
        return arr;
      },
      [] as string[]
    );

    return {
      ...obj,
      [id]: {
        ...fields,
        image,
        education: relatedEducation,
        certification: relatedCertification,
      },
    };
  }, {} as Dict<Provider>);

  await writeData(parsed, "provider");
  return parsed;
};

const cleanMain = async () => {
  const main = await readData<RawMain>("main");
  const single = Object.values(main)[0];
  const educationImage = getId(single.educationImage);

  const parsed: Main = {
    ...single,
    sortedExperience: single.sortedExperience.map(getId),
    sortedEducation: single.sortedEducation.map(getId),
    sortedProjects: single.sortedProjects.map(getId),
    sortedArticles: single.sortedArticles.map(getId),
    educationImage,
  };

  await writeData(parsed, "main");
};

const cleanData = async (): Promise<void> => {
  Logger.log("Cleaning data...");

  const [education, projects, articles, certification] = await Promise.all([
    cleanEducation(),
    cleanProjects(),
    cleanArticles(),
    cleanCertification(),
    cleanMain(),
  ]);

  const [experience] = await Promise.all([
    cleanExperience(projects, articles),
    cleanProviders(education, certification),
  ]);

  await cleanTags(experience, education, projects, articles, certification);

  Logger.success("Successfully cleaned data!");
  Logger.line();
};

export default cleanData;
