// React Imports
import React, { FC, useCallback, useMemo } from "react";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";
import SingleExperience from "./SingleExperience";
import Filters from "../../Components/Filters";
import { useExperience } from "../../Context/DataContext";
import { ExperienceFields } from "../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceSearch, setExperienceSearch } from "../../Redux";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";

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
  const experience = useExperience();

  if (experience === null)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  return (
    <Container>
      <Filters
        defaultSearch={search}
        onSearchChange={(value) => dispatch(setExperienceSearch(value))}
        className={classes.filters}
      />
      <Contents experience={experience} />
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

interface ContentsProps {
  experience: ExperienceFields[];
}

const Contents: FC<ContentsProps> = ({ experience }) => {
  const search = useSelector(getExperienceSearch);
  const normalizedSearch = search.toLowerCase();

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
    if (!normalizedSearch.length) return experience;

    return experience.reduce((arr, exp) => {
      const matches = getExperienceMatch(exp);

      if (matches.some((bool) => bool)) return [...arr, exp];

      return arr;
    }, [] as ExperienceFields[]);
  }, [experience, normalizedSearch, getExperienceMatch]);

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
