// React Imports
import React, { FC } from "react";
import SingleExperience from "./SingleExperience";
import { useExperience } from "../../Context/DataContext";

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
      {experience.map((fields) => (
        <SingleExperience key={fields.id} {...fields} />
      ))}
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Experience;
