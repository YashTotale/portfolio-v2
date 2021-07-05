// React Imports
import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Waypoint } from "react-waypoint";
import { useAnalytics } from "../../Hooks";
import Filters from "../../Components/Custom/Filters";
import ProjectPreview from "../../Components/Content/Project/Preview";
import { generatePageTitle } from "../../Utils/funcs";
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
    margin: theme.spacing(2, 0),
    gap: theme.spacing(4),
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
              label: "Tags",
              values: allTags.map((tag) => tag.title),
              value: tagFilter,
              onChange: (values) => dispatch(setProjectsTagFilter(values)),
            },
            {
              label: "Experience",
              values: allExperience.map(generateExperienceTitle),
              value: experienceFilter,
              onChange: (values) =>
                dispatch(setProjectsExperienceFilter(values)),
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

  if (!filteredProjects.length)
    return (
      <div className={classes.projects}>
        <Typography variant="h6">No projects found</Typography>
      </div>
    );

  return (
    <div className={classes.projects}>
      {filteredProjects.map((project) => (
        <Waypoint
          key={project.id}
          onEnter={() => dispatch(addProjectViewable(project.id))}
          onLeave={() => dispatch(removeProjectViewable(project.id))}
          topOffset="30%"
          bottomOffset="30%"
        >
          <ProjectPreview id={project.id} search={search} />
        </Waypoint>
      ))}
    </div>
  );
};

export default ProjectsPage;
