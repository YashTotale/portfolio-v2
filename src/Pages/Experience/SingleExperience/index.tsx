// React Imports
import React, { FC } from "react";
import Info from "./Info";
import FloatingIcons from "./FloatingIcons";
import MatchHighlight from "../../../Components/MatchHighlight";
import StyledLink from "../../../Components/StyledLink";
import VerticalDivider from "../../../Components/Divider/Vertical";
import HorizontalDivider from "../../../Components/Divider/Horizontal";
import { getImageTitle, getImageUrl } from "../../../API/helpers";
import { ExperienceFields } from "../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceSearch } from "../../../Redux";

// Material UI Imports
import {
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
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
    position: "relative",
  },
  title: {
    margin: theme.spacing(1),
  },
  main: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    padding: theme.spacing(2),

    [theme.breakpoints.only("xs")]: {
      width: "100%",
      paddingBottom: 0,
    },
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
}));

const SingleExperience: FC<ExperienceFields> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const search = useSelector(getExperienceSearch);
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Paper className={classes.container} elevation={12}>
      <div className={classes.titleContainer}>
        <StyledLink
          to={`/experience/${props.id}`}
          variant={isSizeXS ? "h5" : "h4"}
          align="center"
          toMatch={search}
          className={classes.title}
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
      <div className={classes.main}>
        <div className={classes.imageContainer}>
          <img
            src={getImageUrl(props.image)}
            alt={getImageTitle(props.image)}
            className={classes.image}
          />
        </div>
        {!isSizeXS && <VerticalDivider />}
        <Info {...props} />
      </div>
      <HorizontalDivider />
      <FloatingIcons {...props} />
    </Paper>
  );
};

export default SingleExperience;
