// React Imports
import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import Filters from "../../Components/Custom/Filters";
import Tracker from "../../Components/Custom/Tracker";
import Preview from "../../Components/Content/Experience/Preview";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";
import {
  getExperienceTypes,
  useFilteredExperience,
} from "../../Utils/Content/experience";
import { getTagsAsRelated } from "../../Utils/Content/tags";
import { getProjectsAsRelated } from "../../Utils/Content/projects";

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
  setExperienceTypeFilter,
  removeExperienceViewable,
  removeAllExperienceViewable,
  getExperienceTagFilter,
  getExperienceTypeFilter,
  setExperienceTagFilter,
} from "../../Redux";
import { ExperienceSort, EXPERIENCE_SORT } from "../../Redux/experience.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { makeStyles, useTheme, Typography } from "@material-ui/core";

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

  const theme = useTheme();
  const isDarkMode = theme.palette.type === "dark";

  const allTypes = getExperienceTypes();
  const allTags = getTagsAsRelated("experience", isDarkMode);
  const allProjects = getProjectsAsRelated("associated");

  const search = useSelector(getExperienceSearch);
  const sort = useSelector(getExperienceSort);
  const typeFilter = useSelector(getExperienceTypeFilter);
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
              label: "Type",
              values: allTypes,
              value: typeFilter,
              onChange: (
                values: Parameters<typeof setExperienceTypeFilter>[0]
              ) => dispatch(setExperienceTypeFilter(values)),
            },
            {
              label: "Tags",
              values: allTags,
              value: tagFilter,
              onChange: (
                values: Parameters<typeof setExperienceTagFilter>[0]
              ) => dispatch(setExperienceTagFilter(values)),
            },
            {
              label: "Projects",
              values: allProjects,
              value: projectFilter,
              onChange: (
                values: Parameters<typeof setExperienceProjectFilter>[0]
              ) => dispatch(setExperienceProjectFilter(values)),
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
            <Tracker
              key={fields.id}
              onEnter={() => dispatch(addExperienceViewable(fields.id))}
              onLeave={() => dispatch(removeExperienceViewable(fields.id))}
              canRemoveAll={!!experienceViewable.length}
              removeAll={() => dispatch(removeAllExperienceViewable())}
              topOffset="30%"
              bottomOffset="30%"
            >
              <Preview id={fields.id} search={search} />
            </Tracker>
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
