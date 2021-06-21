// React Imports
import React, { FC } from "react";
import Filters from "../../Components/Filters";
import ProjectPreview from "../../Components/Project/Preview";
import { useFilteredProjects } from "../../Utils/Content/projects";
import { sortTags } from "../../Utils/Content/tags";
import {
  generateExperienceTitle,
  sortExperience,
} from "../../Utils/Content/experience";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getProjectsSearch,
  getProjectsSort,
  setProjectsSearch,
  setProjectsSort,
  setProjectsTagFilter,
  getProjectsExperienceFilter,
  setProjectsExperienceFilter,
  getProjectsTagFilter,
} from "../../Redux";
import { ProjectsSort, PROJECTS_SORT } from "../../Redux/projects.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
  },
  projects: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    width: "100%",
  },
}));

const ProjectsPage: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const allTags = sortTags("Alphabetically");
  const allExperience = sortExperience("Alphabetically");

  const search = useSelector(getProjectsSearch);
  const sort = useSelector(getProjectsSort);
  const tagFilter = useSelector(getProjectsTagFilter);
  const experienceFilter = useSelector(getProjectsExperienceFilter);

  return (
    <div className={classes.container}>
      <Filters
        search={{
          defaultSearch: search,
          onSearchChange: (value) => dispatch(setProjectsSearch(value)),
        }}
        sort={{
          value: sort,
          values: PROJECTS_SORT,
          onChange: (value) => dispatch(setProjectsSort(value as ProjectsSort)),
        }}
        related={[
          {
            label: "Tags",
            values: allTags.map((tag) => tag.title),
            value: tagFilter,
            onChange: (values) => dispatch(setProjectsTagFilter(values)),
          },
          {
            label: "Experience",
            values: allExperience.map(generateExperienceTitle),
            value: experienceFilter,
            onChange: (values) => dispatch(setProjectsExperienceFilter(values)),
          },
        ]}
      />
      <Contents />
    </div>
  );
};

const Contents: FC = () => {
  const classes = useStyles();
  const search = useSelector(getProjectsSearch);
  const filteredProjects = useFilteredProjects();

  if (!filteredProjects.length)
    return (
      <div className={classes.projects}>
        <Typography variant="h6">No projects found</Typography>
      </div>
    );

  return (
    <div className={classes.projects}>
      {filteredProjects.map((project) => (
        <ProjectPreview key={project.id} id={project.id} search={search} />
      ))}
    </div>
  );
};

export default ProjectsPage;
