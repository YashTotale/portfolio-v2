// React Imports
import React, { FC, useCallback, useMemo } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import SingleExperience from "./SingleExperience";
import { ExperienceFields } from "../../Utils/types";
import { sortExperience } from "../../Utils/experience";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceSearch, getExperienceSort } from "../../Redux";

// Material UI Imports
import { Typography } from "@material-ui/core";

interface ContentsProps {
  experience: ExperienceFields[];
}

const Contents: FC<ContentsProps> = ({ experience }) => {
  const search = useSelector(getExperienceSearch);
  const sort = useSelector(getExperienceSort);
  const normalizedSearch = search.toLowerCase();

  const sortedExperience = sortExperience(sort, experience);

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

export default Contents;
