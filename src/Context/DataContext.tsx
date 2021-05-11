// React Imports
import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Projects, Tags, Experience } from "../Utils/types";

// API Imports
import query from "../API/query";

interface Data {
  projects: Projects | null;
  tags: Tags | null;
  experience: Experience | null;
}

const defaultValue: Data = {
  projects: null,
  tags: null,
  experience: null,
};

const DataContext = createContext<Data>(defaultValue);

export const DataProvider: FC = ({ children }) => {
  const [data, setData] = useState<Data>(defaultValue);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const projects = await query<Projects>("project");

      if (isMounted) {
        setData((d) => ({ ...d, projects }));
      }
    })();

    (async () => {
      const tags = await query<Tags>("tag");

      if (isMounted) {
        setData((d) => ({ ...d, tags }));
      }
    })();

    (async () => {
      const experience = await query<Experience>("experience");

      if (isMounted) {
        setData((d) => ({ ...d, experience }));
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useProjects = (): Data["projects"] =>
  useContext(DataContext).projects;

export const useTags = (): Data["tags"] => useContext(DataContext).tags;

export const useExperience = (): Data["experience"] =>
  useContext(DataContext).experience;
