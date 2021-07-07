// React Imports
import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Waypoint } from "react-waypoint";
import { useAnalytics } from "../../Hooks";
import Filters from "../../Components/Custom/Filters";
import Preview from "../../Components/Content/Education/Preview";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";
import { useFilteredEducation } from "../../Utils/Content/education";
import { sortTags } from "../../Utils/Content/tags";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getEducationSearch,
  getEducationSort,
  getEducationTagFilter,
  setEducationSearch,
  setEducationSort,
  setEducationTagFilter,
  addEducationViewable,
  removeEducationViewable,
  getEducationViewable,
  removeAllEducationViewable,
} from "../../Redux";
import { EDUCATION_SORT, EducationSort } from "../../Redux/education.slice";
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
  education: {
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

const Education: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const allTags = sortTags("Alphabetically");

  const search = useSelector(getEducationSearch);
  const sort = useSelector(getEducationSort);
  const tagFilter = useSelector(getEducationTagFilter);

  useAnalytics("Education");

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Education")}</title>
      </Helmet>
      <div className={classes.container}>
        <Filters
          search={{
            defaultSearch: search,
            onSearchChange: (value) => dispatch(setEducationSearch(value)),
          }}
          sort={{
            value: sort,
            values: EDUCATION_SORT,
            onChange: (value) =>
              dispatch(setEducationSort(value as EducationSort)),
          }}
          related={[
            {
              label: "Tags",
              values: allTags.map((tag) => tag.title),
              value: tagFilter,
              onChange: (values) => dispatch(setEducationTagFilter(values)),
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
  const search = useSelector(getEducationSearch);
  const filteredEducation = useFilteredEducation();

  const educationViewable = useSelector(getEducationViewable);

  useEffect(() => {
    educationViewable.forEach((e) => {
      if (!filteredEducation.find((exp) => exp.id === e)) {
        dispatch(removeEducationViewable(e));
      }
    });
  }, [dispatch, filteredEducation, educationViewable]);

  useEffect(() => {
    dispatch(removeAllEducationViewable());
  }, [dispatch]);

  return (
    <>
      <HorizontalDivider className={classes.divider} />
      <Typography align="center" variant="h4">
        Education
      </Typography>
      {filteredEducation.length ? (
        <div className={classes.education}>
          {filteredEducation.map((fields) => (
            <Waypoint
              key={fields.id}
              onEnter={() => dispatch(addEducationViewable(fields.id))}
              onLeave={() => dispatch(removeEducationViewable(fields.id))}
              topOffset="30%"
              bottomOffset="30%"
            >
              <Preview id={fields.id} search={search} />
            </Waypoint>
          ))}
        </div>
      ) : (
        <Typography variant="h5" className={classes.noFound}>
          No education found
        </Typography>
      )}
    </>
  );
};

export default Education;
