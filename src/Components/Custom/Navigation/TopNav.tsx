// React Imports
import React, { FC } from "react";
import NavButton from "./NavButton";
import { Paths } from "../../Static/NavController";
import { getPageTitle } from "../../../Utils/funcs";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { getLastNav, popHistory } from "../../../Redux";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";

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

  const lastNav = useSelector(getLastNav);

  return (
    <div className={classes.topNav}>
      {lastNav && (
        <NavButton
          label={getPageTitle(lastNav.title)}
          to={lastNav.pathname || Paths.Home}
          onClick={() => dispatch(popHistory())}
          type="previous"
          typeLabel="Back"
        />
      )}
      <NavButton
        to={props.allPath}
        label={`All ${props.allLabel}`}
        type="next"
        typeLabel=""
      />
    </div>
  );
};

export default TopNav;
