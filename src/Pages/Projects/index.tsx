// React Imports
import React, { FC, useCallback, useMemo } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import Filters from "../../Components/Filters";
import ProjectPreview, {
  PROJECT_WIDTHS,
} from "../../Components/Project/Preview";
import { chunk } from "../../Utils/funcs";
import { ResolvedProject } from "../../Utils/types";
import { getProject, useSortedProjects } from "../../Utils/Content/projects";
import { sortTags } from "../../Utils/Content/tags";
import { getExperience } from "../../Utils/Content/experience";

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
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    margin: theme.spacing(0, 2),
  },
  filters: {
    [theme.breakpoints.only("xl")]: {
      width: PROJECT_WIDTHS.xl * 2 + theme.spacing() * 4,
    },

    [theme.breakpoints.only("lg")]: {
      width: PROJECT_WIDTHS.lg * 2 + theme.spacing() * 4,
    },

    [theme.breakpoints.only("md")]: {
      width: PROJECT_WIDTHS.md * 2 + theme.spacing() * 4,
    },

    [theme.breakpoints.only("sm")]: {
      width: PROJECT_WIDTHS.sm,
    },

    [theme.breakpoints.only("xs")]: {
      width: PROJECT_WIDTHS.xs,
    },
  },
  projects: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  projectChunk: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
  },
}));

const ProjectsPage: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const allTags = sortTags("Alphabetically");
  const allExperience = getExperience();

  const search = useSelector(getProjectsSearch);
  const sort = useSelector(getProjectsSort);
  const tagFilter = useSelector(getProjectsTagFilter);
  const experienceFilter = useSelector(getProjectsExperienceFilter);

  return (
    <Container>
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
            values: allExperience.map((exp) => exp.title),
            value: experienceFilter,
            onChange: (values) => dispatch(setProjectsExperienceFilter(values)),
          },
        ]}
        className={classes.filters}
      />
      <Contents />
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

const Contents: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

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

      return experienceFilter.some((exp) => p.associated?.title === exp);
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
        p.start.toLowerCase().includes(normalizedSearch),
        p.end?.toLowerCase().includes(normalizedSearch) ?? false,
        p.link?.toLowerCase().includes(normalizedSearch) ?? false,
        p.github?.toLowerCase().includes(normalizedSearch) ?? false,
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

  const projectsToRender = filteredProjects.map((project, i, arr) => (
    <ProjectPreview
      key={project.id}
      pushLeft={!isSmall && arr.length % 2 !== 0 && i === arr.length - 1}
      {...project}
    />
  ));

  if (isSmall)
    return <div className={classes.projects}>{projectsToRender}</div>;

  const chunks = chunk(projectsToRender, 2);

  return (
    <div className={classes.projects}>
      {chunks.map((projects, i) => (
        <div key={i} className={classes.projectChunk}>
          {projects}
        </div>
      ))}
    </div>
  );
};

export default ProjectsPage;
