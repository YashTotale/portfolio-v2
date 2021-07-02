// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Filters from "../../Components/Filters";
import Preview from "../../Components/Content/Experience/Preview";
import { generatePageTitle, getSearch } from "../../Utils/funcs";
import { analytics } from "../../Utils/Config/firebase";
import { useFilteredExperience } from "../../Utils/Content/experience";
import { sortTags } from "../../Utils/Content/tags";
import { sortProjects } from "../../Utils/Content/projects";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getExperienceSearch,
  getExperienceSort,
  setExperienceSearch,
  setExperienceSort,
  getExperienceProjectFilter,
  setExperienceProjectFilter,
  getExperienceTagFilter,
  setExperienceTagFilter,
} from "../../Redux";
import { ExperienceSort, EXPERIENCE_SORT } from "../../Redux/experience.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  experience: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
}));

const Experience: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const searchParams = getSearch(location.search);

  const allTags = sortTags("Alphabetically");
  const allProjects = sortProjects("Alphabetically");

  const search = useSelector(getExperienceSearch);
  const sort = useSelector(getExperienceSort);
  const tagFilter = useSelector(getExperienceTagFilter);
  const projectFilter = useSelector(getExperienceProjectFilter);

  analytics.logEvent("page_view", {
    page_title: "Experience",
    ...searchParams,
  });

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Experience")}</title>
      </Helmet>
      <div className={classes.container}>
        <Filters
          search={{
            defaultSearch: search,
            onSearchChange: (value) => dispatch(setExperienceSearch(value)),
          }}
          sort={{
            value: sort,
            values: EXPERIENCE_SORT,
            onChange: (value) =>
              dispatch(setExperienceSort(value as ExperienceSort)),
          }}
          related={[
            {
              label: "Tags",
              values: allTags.map((tag) => tag.title),
              value: tagFilter,
              onChange: (values) => dispatch(setExperienceTagFilter(values)),
            },

            {
              label: "Projects",
              values: allProjects.map((project) => project.title),
              value: projectFilter,
              onChange: (values) =>
                dispatch(setExperienceProjectFilter(values)),
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
  const search = useSelector(getExperienceSearch);
  const filteredExperience = useFilteredExperience();

  if (!filteredExperience.length)
    return <Typography variant="h6">No experience found</Typography>;

  return (
    <div className={classes.experience}>
      {filteredExperience.map((fields) => (
        <Preview key={fields.id} id={fields.id} search={search} />
      ))}
    </div>
  );
};

export default Experience;
