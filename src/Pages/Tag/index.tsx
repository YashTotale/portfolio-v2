// React Imports
import React, { FC } from "react";
import { useParams } from "react-router";
import NotFound from "../NotFound";
import { useTags } from "../../Context/DataContext";

// Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";
import TagMain from "../../Components/Tag/Main";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
}));

interface Params {
  id: string;
}

const Tag: FC = () => {
  const { id } = useParams<Params>();
  // const classes = useStyles();
  const tags = useTags();

  if (tags === null)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  const tagIndex = tags.findIndex((t) => t.id === id);

  if (tagIndex === -1)
    return <NotFound name="tag" redirect="/tags" redirectName="Tags Page" />;

  const tag = tags[tagIndex];

  return (
    <Container>
      <TagMain {...tag} />
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Tag;
