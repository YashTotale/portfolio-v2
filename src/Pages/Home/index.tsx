// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import Typer from "../../Components/Static/Home/Typer";
import SkillSet from "../../Components/Static/Home/SkillSet";
import RichText from "../../Components/Custom/RichText";
import DynamicImage from "../../Components/Atomic/DynamicImage";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import { generatePageTitle } from "../../Utils/funcs";
import { getDescription } from "../../Utils/Content/main";

// Redux Imports
import { DATA_TOUR, TourStep } from "../../Redux/tour.slice";

// Material UI Imports
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  home: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: "100%",
  },
  logo: {
    margin: theme.spacing(2, 0),
  },
  heading: {
    lineHeight: 1,
    marginBottom: theme.spacing(1),
  },
  typer: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.55rem",
    },
  },
  description: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    margin: theme.spacing(1, 0, 2),
  },
}));

const Home: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));

  const description = getDescription();

  useAnalytics("Home");

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Home")}</title>
      </Helmet>
      <div className={classes.home}>
        <DynamicImage
          src={isSizeSmall ? "/logo192.png" : "/logo512.png"}
          alt="Website Logo"
          height={isSizeSmall ? 75 : 100}
          className={classes.logo}
        />
        <Typography
          align="center"
          variant={isSizeSmall ? "h2" : "h1"}
          className={classes.heading}
        >
          Yash Totale
        </Typography>
        <Typography
          variant={isSizeSmall ? "h4" : "h3"}
          align="center"
          className={classes.typer}
          {...{
            [DATA_TOUR]: TourStep.TYPER,
          }}
        >
          Check out my <Typer />
        </Typography>
        <div className={classes.description}>
          <RichText
            richText={description as Document}
            variant={isSizeSmall ? "body2" : "body1"}
          />
        </div>
        <HorizontalDivider />
        <SkillSet />
      </div>
    </>
  );
};

export default Home;
