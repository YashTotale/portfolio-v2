// React Imports
import React, { FC } from "react";
import { useClosableSnackbar } from "../../../../../../Hooks";

// Firebase Imports
import { getAuth } from "../../../../../../Utils/Config/firebase";

// Material UI Imports
import { Button, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  logout: {
    position: "absolute",
    marginLeft: "auto",
    right: theme.spacing(1),

    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
    },
  },
}));

const SignOut: FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useClosableSnackbar();
  const auth = getAuth();

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const onClick = async () => {
    await auth.signOut();
    enqueueSnackbar("Signed Out", {
      variant: "success",
    });
  };

  return (
    <Button
      variant="outlined"
      color="error"
      size={isSizeXS ? "small" : "medium"}
      onClick={onClick}
      className={classes.logout}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
