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

const ProjectsContext = createContext<Projects | null>(null);

export const ProjectsProvider: FC = ({ children }) => {
  const [projects, setProjects] = useState<Projects | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const projects = await getProjects();

      if (isMounted) {
        setProjects(projects);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ProjectsContext.Provider value={projects}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): Projects | null => useContext(ProjectsContext);
