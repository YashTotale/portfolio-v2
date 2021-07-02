// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import NavButton from "./NavButton";
import { useTitle } from "../Context/HeadContext";
import { generateSearch, getSearch } from "../Utils/funcs";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  topNav: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  allButton: {
    maxWidth: "25%",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "45%",
    },
  },
}));

interface TopNavProps {
  allPath: string;
  allLabel: string;
}

const TopNav: FC<TopNavProps> = (props) => {
  const classes = useStyles();

  const location = useLocation();
  const search = getSearch(location.search);
  const title = useTitle();

  const fromPath = search["from_path"];
  const fromTitle = search["from_title"];

  return (
    <div className={classes.topNav}>
      <NavButton
        label={fromTitle}
        to={{
          pathname: fromPath,
          search: generateSearch(
            {
              from_path: location.pathname,
              from_type: "back_nav_button",
            },
            title
          ),
        }}
        type="previous"
        typeLabel="Back"
      />
      <NavButton
        to={{
          pathname: `/${props.allPath}`,
          search: generateSearch(
            {
              from_path: location.pathname,
              from_type: "top_nav_button",
            },
            title
          ),
        }}
        label={`All ${props.allLabel}`}
        type="next"
        typeLabel=""
        className={classes.allButton}
      />
    </div>
  );
};

export default TopNav;
