// React Imports
import React, { FC } from "react";
import Category from "../../Content/Tag/Category";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  skillset: {
    padding: theme.spacing(1, 0),
  },
  skills: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "stretch",
    alignItems: "stretch",
  },
  skillCategory: {
    margin: theme.spacing(2, 0),
  },
}));

const SkillSet: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const tagCategories = [
    "Languages",
    "Frontend",
    "Backend",
    "DevOps",
    "Testing",
    "Design",
  ];

  return (
    <div className={classes.skillset}>
      <Typography align="center" variant={isSizeSmall ? "h5" : "h4"}>
        My Skill Set
      </Typography>
      <div className={classes.skills}>
        {tagCategories.map((category, i) => (
          <Category
            key={i}
            category={category}
            className={classes.skillCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillSet;
