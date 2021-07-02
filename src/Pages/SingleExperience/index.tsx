// React Imports
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import NotFound from "../NotFound";
import TopNav from "../../Components/Navigation/TopNav";
import BottomNav from "../../Components/Navigation/BottomNav";
import ExperienceMain from "../../Components/Content/Experience/Main";
import { generatePageTitle } from "../../Utils/funcs";
import {
  getSingleExperience,
  useSortedExperience,
} from "../../Utils/Content/experience";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

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
        redirect="/experience"
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
        <TopNav allPath="experience" allLabel="Experience" />
        <ExperienceMain id={experience.id} />
        <BottomNav
          basePath="experience"
          label="Experience"
          prevContent={prevExperience}
          nextContent={nextExperience}
        />
      </div>
    </>
  );
};

export default SingleExperience;
