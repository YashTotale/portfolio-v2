//React Imports
import React, { FC, useCallback, useMemo } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import Project, { PROJECT_WIDTHS } from "./Project";
import Filters from "../../Components/Filters";
import { useProjects } from "../../Context/DataContext";
import { chunk } from "../../Utils/funcs";
import { ProjectFields } from "../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getProjectsSearch, setProjectsSearch } from "../../Redux";
import { useAppDispatch } from "../../Store";

//Material UI Imports
import {
  CircularProgress,
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
  const projects = useProjects();
  const search = useSelector(getProjectsSearch);

  if (projects === null)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  return (
    <Container>
      <Filters
        defaultSearch={search}
        onSearchChange={(value) => dispatch(setProjectsSearch(value))}
        className={classes.filters}
      />
      <Contents projects={projects} />
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

interface ContentsProps {
  projects: ProjectFields[];
}

type ProjectIndices = Record<
  Exclude<keyof ProjectFields, "id" | "image">,
  boolean
>;

const Contents: FC<ContentsProps> = ({ projects }) => {
  const classes = useStyles();
  const theme = useTheme();
  const search = useSelector(getProjectsSearch);
  const normalizedSearch = search.toLowerCase();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const getProjectMatch = useCallback(
    (p: ProjectFields) => {
      const indices: ProjectIndices = {
        title: p.title.toLowerCase().includes(normalizedSearch),
        description: documentToPlainTextString(p.description as Document)
          .toLowerCase()
          .includes(normalizedSearch),
        tags: p.tags.some((tag) =>
          tag.fields.title.toLowerCase().includes(normalizedSearch)
        ),
        start: p.start.toLowerCase().includes(normalizedSearch),
        end: p.end.toLowerCase().includes(normalizedSearch),
        link: p.link?.toLowerCase().includes(normalizedSearch) ?? false,
        github: p.github?.toLowerCase().includes(normalizedSearch) ?? false,
      };

      return indices;
    },
    [normalizedSearch]
  );

  const filteredProjects = useMemo(() => {
    if (!normalizedSearch.length) return projects;

    return projects.reduce((arr, project) => {
      const matches = getProjectMatch(project);

      if (Object.values(matches).some((bool) => bool)) return [...arr, project];

      return arr;
    }, [] as ProjectFields[]);
  }, [projects, normalizedSearch, getProjectMatch]);

  if (!filteredProjects.length)
    return (
      <div className={classes.projects}>
        <Typography variant="h6">No projects found</Typography>
      </div>
    );

  const projectsToRender = filteredProjects.map((project, i, arr) => (
    <Project
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
