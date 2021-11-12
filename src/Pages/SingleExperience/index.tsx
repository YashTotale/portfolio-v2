// React Imports
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import NotFound from "../NotFound";
import { Paths } from "../../Components/Static/NavController";
import TopNav from "../../Components/Custom/Navigation/TopNav";
import BottomNav from "../../Components/Custom/Navigation/BottomNav";
import ExperienceMain from "../../Components/Content/Experience/Main";
import { generatePageTitle } from "../../Utils/funcs";
import {
  getSingleExperience,
  useSortedExperience,
} from "../../Utils/Content/experience";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface Params {
  slug: string;
}

const SingleExperience: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();

  const experience = getSingleExperience(slug, true);
  const sortedExperience = useSortedExperience();

  useAnalytics(experience?.title);

  if (!experience)
    return (
      <NotFound
        name="experience"
        redirect={Paths.Experience}
        redirectName="Experience Page"
      />
    );

  const experienceIndex = sortedExperience.findIndex(
    (p) => p.id === experience.id
  );
  const prevExperience = sortedExperience[experienceIndex - 1];
  const nextExperience = sortedExperience[experienceIndex + 1];

  return (
    <>
      <Helmet>
        <title>{generatePageTitle(experience.title)}</title>
      </Helmet>
      <div className={classes.container}>
        <TopNav allPath={Paths.Experience} allLabel="Experience" />
        <ExperienceMain id={experience.id} />
        <BottomNav
          pathFunc={Paths.SingleExperience}
          label="Experience"
          prevContent={prevExperience}
          nextContent={nextExperience}
        />
      </div>
    </>
  );
};

export default SingleExperience;
