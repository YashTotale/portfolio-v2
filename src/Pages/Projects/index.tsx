// React Imports
import React, { FC, useCallback, useMemo } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import Filters from "../../Components/Filters";
import ProjectPreview from "../../Components/Project/Preview";
import { ResolvedProject } from "../../Utils/types";
import { getProject, useSortedProjects } from "../../Utils/Content/projects";
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

  const nonResolved = useSortedProjects();
  const projects = nonResolved.reduce((arr, p) => {
    const project = getProject(p.id);
    if (project) arr.push(project);
    return arr;
  }, [] as ResolvedProject[]);

  const search = useSelector(getProjectsSearch);
  const normalizedSearch = search.toLowerCase();
  const tagFilter = useSelector(getProjectsTagFilter);
  const experienceFilter = useSelector(getProjectsExperienceFilter);

  const checkExperienceFilter = useCallback(
    (p: ResolvedProject) => {
      if (!experienceFilter.length) return true;

      return experienceFilter.some(
        (exp) => p.associated && generateExperienceTitle(p.associated) === exp
      );
    },
    [experienceFilter]
  );

  const checkTagFilter = useCallback(
    (p: ResolvedProject) => {
      if (!tagFilter.length) return true;

      return tagFilter.some((tag) => p.tags.some((t) => t.title === tag));
    },
    [tagFilter]
  );

  const getSearchMatch = useCallback(
    (p: ResolvedProject) => {
      const matches: boolean[] = [
        p.title.toLowerCase().includes(normalizedSearch),
        documentToPlainTextString(p.description as Document)
          .toLowerCase()
          .includes(normalizedSearch),
        p.tags.some((tag) =>
          tag.title.toLowerCase().includes(normalizedSearch)
        ),
        (p.associated &&
          generateExperienceTitle(p.associated)
            .toLowerCase()
            .includes(normalizedSearch)) ??
          false,
        p.start.toLowerCase().includes(normalizedSearch),
        p.end?.toLowerCase().includes(normalizedSearch) ?? false,
      ];

      return matches;
    },
    [normalizedSearch]
  );

  const filteredProjects = useMemo(
    () =>
      projects.reduce((arr, project) => {
        const experienceFiltered = checkExperienceFilter(project);
        if (!experienceFiltered) return arr;

        const tagFiltered = checkTagFilter(project);
        if (!tagFiltered) return arr;

        if (normalizedSearch.length) {
          const matches = getSearchMatch(project);
          if (!matches.some((bool) => bool)) return arr;
        }

        return [...arr, project];
      }, [] as ResolvedProject[]),
    [
      projects,
      normalizedSearch,
      checkExperienceFilter,
      checkTagFilter,
      getSearchMatch,
    ]
  );

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
