// React Imports
import React, { FC, useCallback, useMemo } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import SingleExperience from "./SingleExperience";
import { useSortedExperience } from "../../Utils/Content/experience";
import { Experience } from "../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceSearch } from "../../Redux";

// Material UI Imports
import { Typography } from "@material-ui/core";

const Contents: FC = () => {
  const search = useSelector(getExperienceSearch);
  const normalizedSearch = search.toLowerCase();

  const sortedExperience = useSortedExperience();

  const getExperienceMatch = useCallback(
    (e: Experience) => {
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
    }, [] as Experience[]);
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

export default Contents;
