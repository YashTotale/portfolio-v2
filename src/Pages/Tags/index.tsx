// React Imports
import React, { FC } from "react";
import Tag from "./Tag";
import { useTags } from "../../Context/DataContext";

// Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
    padding: theme.spacing(0, 2),
  },
}));

const Tags: FC = () => {
  const tags = useTags();

  if (tags === null) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      {tags.map((tag) => (
        <Tag key={tag.id} {...tag} />
      ))}
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Tags;
