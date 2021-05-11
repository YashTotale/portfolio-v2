// React Imports
import React, { FC } from "react";
import { useExperience } from "../../Context/DataContext";

// Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";
import SingleExperience from "./SingleExperience";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    margin: theme.spacing(0, 2),
  },
}));

const Experience: FC = () => {
  const experience = useExperience();

  if (experience === null)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  return (
    <Container>
      {Object.entries(experience).map(([id, fields]) => (
        <SingleExperience key={id} {...fields} id={id} />
      ))}
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Experience;
