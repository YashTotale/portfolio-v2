// React Imports
import React, { FC, useEffect, useRef } from "react";
import DynamicPaper from "../../../Components/DynamicPaper";
import { ResolvedExperience } from "../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceScroll, setExperienceScroll } from "../../../Redux";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

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

type ContainerProps = ResolvedExperience & {
  lastPath: string;
};

const Container: FC<ContainerProps> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const scroll = useSelector(getExperienceScroll);

  useEffect(() => {
    if (props.lastPath === props.id) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [props.lastPath, props.id]);

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
    <DynamicPaper ref={ref} className={classes.container}>
      {props.children}
    </DynamicPaper>
  );
};

export default Container;
