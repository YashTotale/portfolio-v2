// React Imports
import React, { FC } from "react";
import Info from "./Info";
import FloatingIcons from "./FloatingIcons";
import StyledLink from "../../../Components/StyledLink";
import { getImageTitle, getImageUrl } from "../../../API/helpers";
import { ExperienceFields } from "../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceSearch } from "../../../Redux";

// Material UI Imports
import { Divider, makeStyles, Paper } from "@material-ui/core";

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
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(1, 0),
    width: "100%",
    position: "relative",
    minHeight: theme.spacing(6),
  },
  divider: {
    height: "1px",
  },
  main: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    padding: theme.spacing(2),
  },
  image: {
    [theme.breakpoints.only("xl")]: {
      width: 225,
    },

    [theme.breakpoints.only("lg")]: {
      width: 200,
    },

    [theme.breakpoints.only("md")]: {
      width: 175,
    },

    [theme.breakpoints.only("sm")]: {
      width: 150,
    },

    [theme.breakpoints.only("xs")]: {
      width: 125,
    },
  },
  verticalDivider: {
    width: "2px",
  },
}));

const SingleExperience: FC<ExperienceFields> = (props) => {
  const classes = useStyles();
  const search = useSelector(getExperienceSearch);

  return (
    <Paper className={classes.container}>
      <div className={classes.titleContainer}>
        <StyledLink
          to={`/experience/${props.id}`}
          variant="h4"
          toMatch={search}
        >
          {props.title}
        </StyledLink>
        <FloatingIcons {...props} />
      </div>
      <Divider flexItem className={classes.divider} />
      <div className={classes.main}>
        <div className={classes.imageContainer}>
          <img
            src={getImageUrl(props.image)}
            alt={getImageTitle(props.image)}
            className={classes.image}
          />
        </div>
        <Divider
          orientation="vertical"
          flexItem
          className={classes.verticalDivider}
        />
        <Info {...props} />
      </div>
    </Paper>
  );
};

export default SingleExperience;
