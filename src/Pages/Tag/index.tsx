// React Imports
import React, { FC } from "react";
import { useParams } from "react-router";
import clsx from "clsx";
import NotFound from "../NotFound";
import TagMain from "../../Components/Tag/Main";
import { useTags } from "../../Context/DataContext";

// Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    paddingBottom: theme.spacing(1),
  },
  tag: {
    margin: theme.spacing(4, 0),
  },
  arrowContainer: {
    borderRadius: "50%",
    border: `3px solid ${theme.palette.text.primary}`,
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.text.primary,
  },
  arrowDown: {
    animation: "$bounceDown 2s infinite",
  },
  arrowUp: {
    animation: "$bounceUp 2s infinite",
  },
  "@keyframes bounceDown": {
    "0%, 20%, 50%, 80%, 100%": {
      transform: "translateY(0)",
    },
    "40%": {
      transform: "translateY(-20px)",
    },
    "60%": {
      transform: "translateY(-10px)",
    },
  },
  "@keyframes bounceUp": {
    "0%, 20%, 50%, 80%, 100%": {
      transform: "translateY(0)",
    },
    "40%": {
      transform: "translateY(20px)",
    },
    "60%": {
      transform: "translateY(10px)",
    },
  },
}));

interface Params {
  id: string;
}

const Tag: FC = () => {
  const { id } = useParams<Params>();
  const classes = useStyles();
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
      {tagIndex !== 0 && (
        <Arrow up={true} to={`/tags/${tags[tagIndex - 1].id}`} />
      )}
      <TagMain {...tag} className={classes.tag} />
      {tagIndex !== tags.length - 1 && (
        <Arrow to={`/tags/${tags[tagIndex + 1].id}`} />
      )}
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

interface ArrowProps {
  to: string;
  up?: boolean;
}

const Arrow: FC<ArrowProps> = ({ to, up = false }) => {
  const classes = useStyles();

  return (
    <Link to={to}>
      <div
        className={clsx(
          classes.arrowContainer,
          classes[up ? "arrowUp" : "arrowDown"]
        )}
      >
        {up ? <ArrowUpward /> : <ArrowDownward />}
      </div>
    </Link>
  );
};

export default Tag;
