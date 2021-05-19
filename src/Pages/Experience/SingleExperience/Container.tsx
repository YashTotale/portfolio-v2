// React Imports
import React, { FC, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import MatchHighlight from "../../../Components/MatchHighlight";
import HorizontalDivider from "../../../Components/Divider/Horizontal";
import StyledLink from "../../../Components/StyledLink";
import {
  useArticles,
  useProjects,
  useTags,
} from "../../../Context/DataContext";
import { ExperienceFields } from "../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceSearch } from "../../../Redux";

// Material UI Imports
import {
  makeStyles,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "95%",
    margin: theme.spacing(2, 0),
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  title: {
    margin: theme.spacing(1),
  },
}));

const Container: FC<ExperienceFields> = (props) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>();
  const [shouldScroll, setShouldScroll] = useState(false);

  const pathname = useLocation().pathname;
  const parts = pathname.split("/");
  const last = parts[parts.length - 1];

  const projects = useProjects();
  const articles = useArticles();
  const tags = useTags();
  const loading = projects === null || articles === null || tags === null;

  const search = useSelector(getExperienceSearch);

  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!loading && last === props.id) {
      setTimeout(
        () =>
          ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        200
      );
    }
  }, [loading, last, props.id]);

  useEffect(() => {
    if (shouldScroll) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  return (
    <Paper ref={ref} className={classes.container} elevation={12}>
      <div className={classes.titleContainer}>
        <StyledLink
          to={`/experience/${props.id}`}
          variant={isSizeSmall ? "h5" : "h4"}
          align="center"
          toMatch={search}
          className={classes.title}
          onClick={() => {
            if (last === props.id) setShouldScroll(true);
          }}
        >
          {`${props.role} @ ${props.title}`}
        </StyledLink>
        <Typography variant="body1">
          <MatchHighlight toMatch={search}>
            {`${props.start} - ${props.end ?? "Present"}`}
          </MatchHighlight>
        </Typography>
      </div>
      <HorizontalDivider />
      {props.children}
    </Paper>
  );
};

export default Container;
