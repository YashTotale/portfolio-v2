// React Imports
import React, { FC } from "react";
import Info from "./Info";
import FloatingIcons from "./FloatingIcons";
import StyledLink from "../../StyledLink";
import DynamicPaper from "../../DynamicPaper";
import DynamicImage from "../../DynamicImage";
import MatchHighlight from "../../MatchHighlight";
import VerticalDivider from "../../Divider/Vertical";
import HorizontalDivider from "../../Divider/Horizontal";
import {
  generateExperienceTitle,
  getSingleExperience,
} from "../../../Utils/Content/experience";

// Material UI Imports
import {
  makeStyles,
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

interface MainProps {
  id: string;
  search?: string;
}

const Main: FC<MainProps> = (props) => {
  const classes = useStyles();
  const experience = getSingleExperience(props.id);

  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  if (!experience) return null;

  return (
    <DynamicPaper className={classes.container}>
      <div className={classes.titleContainer}>
        <StyledLink
          to={`/experience/${experience.id}`}
          variant={isSizeSmall ? "h5" : "h4"}
          align="center"
          toMatch={props.search}
          className={classes.title}
        >
          {generateExperienceTitle(experience)}
        </StyledLink>
        <Typography variant="body1">
          <MatchHighlight toMatch={props.search}>
            {`${experience.start} - ${experience.end ?? "Present"}`}
          </MatchHighlight>
        </Typography>
      </div>
      <HorizontalDivider />
      <div className={classes.main}>
        <div className={classes.imageContainer}>
          <DynamicImage
            src={`${experience.image.file.url}?w=225`}
            alt={experience.image.title}
            className={classes.image}
          />
        </div>
        {!isSizeSmall && <VerticalDivider />}
        <Info {...experience} search={props.search} />
      </div>
      <HorizontalDivider />
      <FloatingIcons {...experience} />
    </DynamicPaper>
  );
};

export default Main;
