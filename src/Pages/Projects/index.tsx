// React Imports
import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import Tracker from "../../Components/Custom/Tracker";
import { useAnalytics } from "../../Hooks";
import Filters from "../../Components/Custom/Filters";
import ProjectPreview from "../../Components/Content/Project/Preview";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";
import { useFilteredProjects } from "../../Utils/Content/projects";
import { getTagsAsRelated } from "../../Utils/Content/tags";
import { getExperienceAsRelated } from "../../Utils/Content/experience";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getProjectsSearch,
  getProjectsSort,
  setProjectsSearch,
  setProjectsSort,
  setProjectsTagFilter,
  addProjectViewable,
  getProjectsViewable,
  removeAllProjectViewable,
  removeProjectViewable,
  getProjectsExperienceFilter,
  setProjectsExperienceFilter,
  getProjectsTagFilter,
} from "../../Redux";
import { ProjectsSort, PROJECTS_SORT } from "../../Redux/projects.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

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
    width: `calc(100% + ${theme.spacing(4)})`,

    "&:after": {
      content: "''",
      flex: "auto",
    },

    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  project: {
    margin: theme.spacing(2),

    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(2, 0),
    },
  },
  divider: {
    margin: theme.spacing(1.5, 0, 1),
  },
  noFound: {
    marginTop: theme.spacing(1),
  },
}));

const ProjectsPage: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const allTags = getTagsAsRelated("projects", isDarkMode);
  const allExperience = getExperienceAsRelated("projects", isDarkMode);

  const search = useSelector(getProjectsSearch);
  const sort = useSelector(getProjectsSort);
  const tagFilter = useSelector(getProjectsTagFilter);
  const experienceFilter = useSelector(getProjectsExperienceFilter);

  useAnalytics("Projects");

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Projects")}</title>
      </Helmet>
      <div className={classes.container}>
        <Filters
          search={{
            defaultSearch: search,
            onSearchChange: (value) => dispatch(setProjectsSearch(value)),
          }}
          sort={{
            value: sort,
            values: PROJECTS_SORT,
            onChange: (value) =>
              dispatch(setProjectsSort(value as ProjectsSort)),
          }}
          related={[
            {
              label: "Experience",
              values: allExperience,
              value: experienceFilter,
              onChange: (
                values: Parameters<typeof setProjectsExperienceFilter>[0]
              ) => dispatch(setProjectsExperienceFilter(values)),
            },
            {
              label: "Tags",
              values: allTags,
              value: tagFilter,
              onChange: (values: Parameters<typeof setProjectsTagFilter>[0]) =>
                dispatch(setProjectsTagFilter(values)),
            },
          ]}
        />
        <Contents />
      </div>
    </>
  );
};

const Contents: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const search = useSelector(getProjectsSearch);
  const filteredProjects = useFilteredProjects();

  const projectsViewable = useSelector(getProjectsViewable);

  useEffect(() => {
    projectsViewable.forEach((p) => {
      if (!filteredProjects.find((project) => project.id === p)) {
        dispatch(removeProjectViewable(p));
      }
    });
  }, [dispatch, filteredProjects, projectsViewable]);

  useEffect(() => {
    dispatch(removeAllProjectViewable());
  }, [dispatch]);

  return (
    <>
      <HorizontalDivider className={classes.divider} />
      <Typography align="center" variant="h4">
        Projects
      </Typography>
      {filteredProjects.length ? (
        <div className={classes.projects}>
          {filteredProjects.map((project) => (
            <Tracker
              key={project.id}
              onEnter={() => dispatch(addProjectViewable(project.id))}
              onLeave={() => dispatch(removeProjectViewable(project.id))}
              canRemoveAll={!!projectsViewable.length}
              removeAll={() => dispatch(removeAllProjectViewable())}
              topOffset="30%"
              bottomOffset="30%"
            >
              <ProjectPreview
                id={project.id}
                search={search}
                className={classes.project}
              />
            </Tracker>
          ))}
        </div>
      ) : (
        <Typography variant="h5" className={classes.noFound}>
          No projects found
        </Typography>
      )}
    </>
  );
};

export default ProjectsPage;
