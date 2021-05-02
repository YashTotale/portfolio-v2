// React Imports
import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Projects } from "../Utils/types";

// API Imports
import { getProjects } from "../API/projects";

interface Data {
  projects: Projects | null;
}

const defaultValue: Data = {
  projects: null,
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

    return () => {
      isMounted = false;
    };
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useProjects = (): Data["projects"] =>
  useContext(DataContext).projects;
