// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import Title from "./Components/Title";
import Description from "./Components/Description";
import TagOverlay from "../../Tag/Overlay";
import MainContainer from "../../Shared/MainContainer";
import { getSingleEducation } from "../../../../Utils/Content/education";

// Material UI Imports
import { Paper } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
    padding: theme.spacing(1, 0),
  },
  main: {
    padding: theme.spacing(0, 2),
    width: "100%",
  },
  associated: {
    margin: theme.spacing(2, 0),
    width: "100%",
  },
  overlay: {
    margin: theme.spacing(1, 2),
  },
}));

interface MainProps {
  id: string;
  search?: string;
  className?: string;
}

const Main: FC<MainProps> = (props) => {
  const classes = useStyles();

  const education = getSingleEducation(props.id);
  if (!education) return null;

  return (
    <Paper elevation={8} className={clsx(classes.root, props.className)}>
      <Title {...education} search={props.search} />
      <Description {...education} />
      <div className={classes.main}>
        <MainContainer title="Related Tags" direction="row">
          {education.tags.map((tag) => (
            <TagOverlay key={tag.id} id={tag.id} className={classes.overlay} />
          ))}
        </MainContainer>
      </div>
    </Paper>
  );
};

export default Main;
