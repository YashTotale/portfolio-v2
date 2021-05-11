// React Imports
import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  ProjectFields,
  TagFields,
  ExperienceFields,
  ArticleFields,
} from "../Utils/types";

// API Imports
import query from "../API/query";

interface Data {
  projects: ProjectFields[] | null;
  tags: TagFields[] | null;
  experience: ExperienceFields[] | null;
  articles: ArticleFields[] | null;
}

const defaultValue: Data = {
  projects: null,
  tags: null,
  experience: null,
  articles: null,
};

const DataContext = createContext<Data>(defaultValue);

export const DataProvider: FC = ({ children }) => {
  const [data, setData] = useState<Data>(defaultValue);

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async <T extends unknown>(
      contentType: string,
      key: keyof Data
    ) => {
      const content = await query<T>(contentType);

      if (isMounted) {
        setData((d) => ({ ...d, [key]: content }));
      }
    };

    fetchContent<ProjectFields>("project", "projects");
    fetchContent<TagFields>("tag", "tags");
    fetchContent<ExperienceFields>("experience", "experience");
    fetchContent<ArticleFields>("article", "articles");

    return () => {
      isMounted = false;
    };
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = (): Data => useContext(DataContext);

export const useProjects = (): Data["projects"] => useData().projects;

export const useTags = (): Data["tags"] => useData().tags;

export const useExperience = (): Data["experience"] => useData().experience;

export const useArticles = (): Data["articles"] => useData().articles;
