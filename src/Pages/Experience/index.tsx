// React Imports
import React, { FC, useCallback, useMemo } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import Filters from "../../Components/Filters";
import SingleExperience from "../../Components/Experience/Main";
import { Experience as ExperienceFields } from "../../Utils/types";
import { useSortedExperience } from "../../Utils/Content/experience";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getExperienceSearch,
  getExperienceSort,
  setExperienceSearch,
  setExperienceSort,
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
    justifyContent: "stretch",
    width: "100%",
  },
  filters: {
    width: "95%",
  },
}));

const Experience: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const search = useSelector(getExperienceSearch);
  const sort = useSelector(getExperienceSort);

  return (
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
        className={classes.filters}
      />
      <Contents />
    </div>
  );
};

const Contents: FC = () => {
  const search = useSelector(getExperienceSearch);
  const normalizedSearch = search.toLowerCase();

  const sortedExperience = useSortedExperience();

  const getExperienceMatch = useCallback(
    (e: ExperienceFields) => {
      const matches: boolean[] = [
        e.title.toLowerCase().includes(normalizedSearch),
        documentToPlainTextString(e.description as Document)
          .toLowerCase()
          .includes(normalizedSearch),
        documentToPlainTextString(e.responsibilities as Document)
          .toLowerCase()
          .includes(normalizedSearch),
        e.type.toLowerCase().includes(normalizedSearch),
        e.role.toLowerCase().includes(normalizedSearch),
        e.start.toLowerCase().includes(normalizedSearch),
        e.end?.toLowerCase().includes(normalizedSearch) ?? false,
        e.link?.toLowerCase().includes(normalizedSearch) ?? false,
        e.github?.toLowerCase().includes(normalizedSearch) ?? false,
      ];

      return matches;
    },
    [normalizedSearch]
  );

  const filteredExperience = useMemo(() => {
    if (!normalizedSearch.length) return sortedExperience;

    return sortedExperience.reduce((arr, exp) => {
      const matches = getExperienceMatch(exp);

      if (matches.some((bool) => bool)) return [...arr, exp];

      return arr;
    }, [] as ExperienceFields[]);
  }, [sortedExperience, normalizedSearch, getExperienceMatch]);

  if (!filteredExperience.length)
    return <Typography variant="h6">No experience found</Typography>;

  return (
    <>
      {filteredExperience.map((fields) => (
        <SingleExperience key={fields.id} {...fields} />
      ))}
    </>
  );
};

export default Experience;
