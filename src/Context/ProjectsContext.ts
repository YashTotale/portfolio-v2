import React, { useContext } from "react";
import { Projects } from "../Utils/types";

const ProjectsContext = React.createContext<Projects | null>(null);

export const ProjectsProvider = ProjectsContext.Provider;

export const useProjects = (): Projects | null => useContext(ProjectsContext);
