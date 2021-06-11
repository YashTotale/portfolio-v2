// React Imports
import React, { FC, useCallback, useMemo } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import Filters from "../../Components/Filters";
import ExperienceMain from "../../Components/Experience/Main";
import { ResolvedExperience } from "../../Utils/types";
import {
  getSingleExperience,
  useSortedExperience,
} from "../../Utils/Content/experience";
import { getTags } from "../../Utils/Content/tags";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getExperienceSearch,
  getExperienceSort,
  setExperienceSearch,
  setExperienceSort,
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
  const allTags = getTags();

  const search = useSelector(getExperienceSearch);
  const sort = useSelector(getExperienceSort);
  const tagFilter = useSelector(getExperienceTagFilter);

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
        related={[
          {
            label: "Tags",
            values: allTags.map((tag) => tag.title),
            value: tagFilter,
            onChange: (values) => dispatch(setExperienceTagFilter(values)),
          },
        ]}
        className={classes.filters}
      />
      <Contents />
    </div>
  );
};

const Contents: FC = () => {
  const nonResolved = useSortedExperience();
  const experience = nonResolved.reduce((arr, e) => {
    const experience = getSingleExperience(e.id);
    if (experience) arr.push(experience);
    return arr;
  }, [] as ResolvedExperience[]);

  const search = useSelector(getExperienceSearch);
  const normalizedSearch = search.toLowerCase();
  const tagFilter = useSelector(getExperienceTagFilter);

  const checkTagFilter = useCallback(
    (p: ResolvedExperience) => {
      if (!tagFilter.length) return true;

      return tagFilter.some((tag) => p.tags.some((t) => t.title === tag));
    },
    [tagFilter]
  );

  const getSearchMatch = useCallback(
    (e: ResolvedExperience) => {
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

  const filteredExperience = useMemo(
    () =>
      experience.reduce((arr, experience) => {
        const tagFiltered = checkTagFilter(experience);
        if (!tagFiltered) return arr;

        if (normalizedSearch.length) {
          const matches = getSearchMatch(experience);
          if (!matches.some((bool) => bool)) return arr;
        }

        return [...arr, experience];
      }, [] as ResolvedExperience[]),
    [experience, normalizedSearch, getSearchMatch, checkTagFilter]
  );

  if (!filteredExperience.length)
    return <Typography variant="h6">No experience found</Typography>;

  return (
    <>
      {filteredExperience.map((fields) => (
        <ExperienceMain key={fields.id} id={fields.id} />
      ))}
    </>
  );
};

export default Experience;
