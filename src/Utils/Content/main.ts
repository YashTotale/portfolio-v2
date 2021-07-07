// External Imports
import { Asset } from "contentful";

// Data Imports
import main from "../../Data/main.json";

// Internal Imports
import { Main } from "../types";
import { getAsset } from "./assets";

export const getMain = (): Main => {
  return (main as unknown) as Main;
};

export const getDescription = (): Main["description"] => {
  const main = getMain();
  return main.description;
};

export const getDefaultSortedExperience = (): Main["sortedExperience"] => {
  const main = getMain();
  return main.sortedExperience;
};

export const getDefaultSortedProjects = (): Main["sortedProjects"] => {
  const main = getMain();
  return main.sortedProjects;
};

export const getDefaultSortedArticles = (): Main["sortedArticles"] => {
  const main = getMain();
  return main.sortedArticles;
};

export const getDefaultEducationImage = (): Asset["fields"] => {
  const main = getMain();
  const educationImage = getAsset(main.educationImage);
  return educationImage;
};
