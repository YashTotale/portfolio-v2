// React Imports
import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { generatePageTitle } from "../../Utils/funcs";
import HorizontalDivider from "../../Components/Atomic/Divider/Horizontal";
import Profile from "../../Components/Static/Settings/Sections/Profile";
import Display from "../../Components/Static/Settings/Sections/Display";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1.5, 0, 1),
  },
  settings: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
  },
}));

const Settings: FC = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>{generatePageTitle("Settings")}</title>
      </Helmet>
      <div className={classes.settings}>
        <HorizontalDivider className={classes.divider} />
        <Typography align="center" variant="h4">
          Settings
        </Typography>
        <Profile />
        <Display />
      </div>
    </>
  );
};

export default Settings;