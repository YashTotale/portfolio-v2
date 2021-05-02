// React Imports
import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Projects, Tags } from "../Utils/types";

// API Imports
import { getProjects } from "../API/projects";
import { getTags } from "../API/tags";

interface Data {
  projects: Projects | null;
  tags: Tags | null;
}

const defaultValue: Data = {
  projects: null,
  tags: null,
};

const DataContext = createContext<Data>(defaultValue);

export const DataProvider: FC = ({ children }) => {
  const [data, setData] = useState<Data>(defaultValue);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const projects = await getProjects();

      if (isMounted) {
        setData((d) => ({ ...d, projects }));
      }
    })();

    (async () => {
      const tags = await getTags();

      if (isMounted) {
        setData((d) => ({ ...d, tags }));
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
