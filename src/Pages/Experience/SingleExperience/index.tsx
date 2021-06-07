// React Imports
import React, { FC } from "react";
import Container from "./Container";
import Info from "./Info";
import FloatingIcons from "./FloatingIcons";
import StyledLink from "../../../Components/StyledLink";
import DynamicImage from "../../../Components/DynamicImage";
import MatchHighlight from "../../../Components/MatchHighlight";
import VerticalDivider from "../../../Components/Divider/Vertical";
import HorizontalDivider from "../../../Components/Divider/Horizontal";
import { useLastPath } from "../../../Hooks";
import { getSingleExperience } from "../../../Utils/Content/experience";

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

interface SingleExperienceProps {
  id: string;
}

const SingleExperience: FC<SingleExperienceProps> = (props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const lastPath = useLastPath();
  const search = useSelector(getExperienceSearch);
  const experience = getSingleExperience(props.id);

  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  if (!experience) return null;

  return (
    <Container {...experience} lastPath={lastPath}>
      <div className={classes.titleContainer}>
        <StyledLink
          to={`/experience/${experience.id}`}
          variant={isSizeSmall ? "h5" : "h4"}
          align="center"
          toMatch={search}
          className={classes.title}
          onClick={() => {
            if (lastPath === experience.id)
              dispatch(setExperienceScroll(experience.id));
          }}
        >
          {`${experience.role} @ ${experience.title}`}
        </StyledLink>
        <Typography variant="body1">
          <MatchHighlight toMatch={search}>
            {`${experience.start} - ${experience.end ?? "Present"}`}
          </MatchHighlight>
        </Typography>
      </div>
      <HorizontalDivider />
      <div className={classes.main}>
        <div className={classes.imageContainer}>
          <DynamicImage
            src={experience.image.file.url}
            alt={experience.image.title}
            className={classes.image}
          />
        </div>
        {!isSizeSmall && <VerticalDivider />}
        <Info {...experience} />
      </div>
      <HorizontalDivider />
      <FloatingIcons {...experience} />
    </Container>
  );
};

export default SingleExperience;
