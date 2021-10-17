// React Imports
import React, { FC, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import Filters from "../../Components/Custom/Filters";
import Tracker from "../../Components/Custom/Tracker";
import Preview from "../../Components/Content/Education/Preview";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";
import {
  getEducationTypes,
  useFilteredEducation,
} from "../../Utils/Content/education";
import { getProvidersAsRelated } from "../../Utils/Content/providers";
import { getTagsAsRelated } from "../../Utils/Content/tags";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getEducationSearch,
  getEducationSort,
  getEducationTagFilter,
  getEducationTypeFilter,
  getEducationProviderFilter,
  setEducationSearch,
  setEducationSort,
  setEducationTagFilter,
  setEducationTypeFilter,
  setEducationProviderFilter,
  addEducationViewable,
  removeEducationViewable,
  getEducationViewable,
  removeAllEducationViewable,
} from "../../Redux";
import { EDUCATION_SORT, EducationSort } from "../../Redux/education.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

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

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const allTypes = getEducationTypes();
  const allTags = getTagsAsRelated("education", isDarkMode);
  const allProviders = getProvidersAsRelated("education");

  const search = useSelector(getEducationSearch);
  const sort = useSelector(getEducationSort);
  const tagFilter = useSelector(getEducationTagFilter);
  const typeFilter = useSelector(getEducationTypeFilter);
  const providerFilter = useSelector(getEducationProviderFilter);

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
              label: "Type",
              values: allTypes,
              value: typeFilter,
              onChange: (
                values: Parameters<typeof setEducationTypeFilter>[0]
              ) => dispatch(setEducationTypeFilter(values)),
            },
            {
              label: "Provider",
              values: allProviders,
              value: providerFilter,
              onChange: (
                values: Parameters<typeof setEducationProviderFilter>[0]
              ) => dispatch(setEducationProviderFilter(values)),
            },
            {
              label: "Tags",
              values: allTags,
              value: tagFilter,
              onChange: (values: Parameters<typeof setEducationTagFilter>[0]) =>
                dispatch(setEducationTagFilter(values)),
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
      if (!filteredEducation.find((ed) => ed.id === e)) {
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
            <Tracker
              key={fields.id}
              onEnter={() => dispatch(addEducationViewable(fields.id))}
              onLeave={() => dispatch(removeEducationViewable(fields.id))}
              canRemoveAll={!!educationViewable.length}
              removeAll={() => dispatch(removeAllEducationViewable())}
              topOffset="30%"
              bottomOffset="30%"
            >
              <Preview id={fields.id} search={search} />
            </Tracker>
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
