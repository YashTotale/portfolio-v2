// React Imports
import React, { FC, useEffect, useRef } from "react";
import {
  useArticles,
  useProjects,
  useTags,
} from "../../../Context/DataContext";
import { ExperienceFields } from "../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceScroll, setExperienceScroll } from "../../../Redux";

// Material UI Imports
import { makeStyles, Paper } from "@material-ui/core";
import { useAppDispatch } from "../../../Store";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "95%",
    margin: theme.spacing(2, 0),
  },
}));

type ContainerProps = ExperienceFields & {
  lastPath: string;
};

const Container: FC<ContainerProps> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>();

  const projects = useProjects();
  const articles = useArticles();
  const tags = useTags();
  const loading = projects === null || articles === null || tags === null;

  const scroll = useSelector(getExperienceScroll);

  useEffect(() => {
    if (!loading && props.lastPath === props.id) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [loading, props.lastPath, props.id]);

  useEffect(() => {
    if (scroll === props.id) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      dispatch(setExperienceScroll(null));
    }
  }, [scroll, dispatch, props.id]);

  return (
    <Paper ref={ref} className={classes.container} elevation={12}>
      {props.children}
    </Paper>
  );
};

export default Container;
