// React Imports
import React, { FC } from "react";
import Container from "./Container";
import Info from "./Info";
import FloatingIcons from "./FloatingIcons";
import StyledLink from "../../../Components/StyledLink";
import MatchHighlight from "../../../Components/MatchHighlight";
import VerticalDivider from "../../../Components/Divider/Vertical";
import HorizontalDivider from "../../../Components/Divider/Horizontal";
import { useLastPath } from "../../../Hooks";
import { getImageTitle, getImageUrl } from "../../../API/helpers";
import { ExperienceFields } from "../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import { getExperienceSearch, setExperienceScroll } from "../../../Redux";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  main: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
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

    [theme.breakpoints.down("sm")]: {
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
  const dispatch = useAppDispatch();
  const lastPath = useLastPath();
  const search = useSelector(getExperienceSearch);

  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container {...props} lastPath={lastPath}>
      <div className={classes.titleContainer}>
        <StyledLink
          to={`/experience/${props.id}`}
          variant={isSizeSmall ? "h5" : "h4"}
          align="center"
          toMatch={search}
          className={classes.title}
          onClick={() => {
            if (lastPath === props.id) dispatch(setExperienceScroll(props.id));
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
      <div className={classes.main}>
        <div className={classes.imageContainer}>
          <img
            src={getImageUrl(props.image)}
            alt={getImageTitle(props.image)}
            className={classes.image}
          />
        </div>
        {!isSizeSmall && <VerticalDivider />}
        <Info {...props} />
      </div>
      <HorizontalDivider />
      <FloatingIcons {...props} />
    </Container>
  );
};

export default SingleExperience;
