// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import NavButton from "./NavButton";
import { useTitle } from "../../Context/HeadContext";
import { generateSearch, getPageTitle } from "../../Utils/funcs";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { getLastNav, popHistory } from "../../Redux";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  topNav: {
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
}));

interface TopNavProps {
  allPath: string;
  allLabel: string;
}

const TopNav: FC<TopNavProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const location = useLocation();
  const title = useTitle();

  const lastNav = useSelector(getLastNav);

  return (
    <div className={classes.topNav}>
      {lastNav && (
        <NavButton
          label={getPageTitle(lastNav.title)}
          to={{
            pathname: lastNav.pathname || "/",
            search: generateSearch(
              {
                from_path: location.pathname,
                from_type: "back_nav_button",
              },
              title
            ),
          }}
          onClick={() => dispatch(popHistory())}
          type="previous"
          typeLabel="Back"
        />
      )}
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
      />
    </div>
  );
};

export default TopNav;
