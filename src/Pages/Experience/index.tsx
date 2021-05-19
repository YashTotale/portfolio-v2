// React Imports
import React, { FC } from "react";
import Contents from "./Contents";
import Filters from "../../Components/Filters";
import { useExperience } from "../../Context/DataContext";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getExperienceSearch,
  getExperienceSort,
  setExperienceSearch,
  setExperienceSort,
} from "../../Redux";
import { ExperienceSort, EXPERIENCE_SORT } from "../../Redux/sort.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";

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
      <Contents experience={experience} />
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Experience;
