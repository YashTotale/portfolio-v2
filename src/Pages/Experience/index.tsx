// React Imports
import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Waypoint } from "react-waypoint";
import { useAnalytics } from "../../Hooks";
import Filters from "../../Components/Custom/Filters";
import Preview from "../../Components/Content/Experience/Preview";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";
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
  addExperienceViewable,
  getExperienceViewable,
  removeExperienceViewable,
  removeAllExperienceViewable,
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
  divider: {
    margin: theme.spacing(1.5, 0, 1),
  },
  noFound: {
    marginTop: theme.spacing(1),
  },
}));

const Experience: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const allTags = sortTags("Alphabetically");
  const allProjects = sortProjects("Alphabetically");

  const search = useSelector(getExperienceSearch);
  const sort = useSelector(getExperienceSort);
  const tagFilter = useSelector(getExperienceTagFilter);
  const projectFilter = useSelector(getExperienceProjectFilter);

  useAnalytics("Experience");

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
  const dispatch = useAppDispatch();
  const search = useSelector(getExperienceSearch);
  const filteredExperience = useFilteredExperience();

  const experienceViewable = useSelector(getExperienceViewable);

  useEffect(() => {
    experienceViewable.forEach((e) => {
      if (!filteredExperience.find((exp) => exp.id === e)) {
        dispatch(removeExperienceViewable(e));
      }
    });
  }, [dispatch, filteredExperience, experienceViewable]);

  useEffect(() => {
    dispatch(removeAllExperienceViewable());
  }, [dispatch]);

  return (
    <>
      <HorizontalDivider className={classes.divider} />
      <Typography align="center" variant="h4">
        Experience
      </Typography>
      {filteredExperience.length ? (
        <div className={classes.experience}>
          {filteredExperience.map((fields) => (
            <Waypoint
              key={fields.id}
              onEnter={() => dispatch(addExperienceViewable(fields.id))}
              onLeave={() => dispatch(removeExperienceViewable(fields.id))}
              topOffset="30%"
              bottomOffset="30%"
            >
              <Preview id={fields.id} search={search} />
            </Waypoint>
          ))}
        </div>
      ) : (
        <Typography variant="h5" className={classes.noFound}>
          No experience found
        </Typography>
      )}
    </>
  );
};

export default Experience;
