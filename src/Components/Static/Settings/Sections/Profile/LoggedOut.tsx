// React Imports
import React, { FC } from "react";
import { useClosableSnackbar } from "../../../../../Hooks";

// Firebase Imports
import "firebase/auth";
import firebase, { useAuth } from "../../../../../Utils/Config/firebase";
import { StyledFirebaseAuth } from "react-firebaseui";

// Material UI Imports
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
  },
}));

const NotLoggedIn: FC = () => {
  const classes = useStyles();
  const auth = useAuth();
  const { enqueueSnackbar } = useClosableSnackbar();

  return (
    <div className={classes.container}>
      <Typography align="center">You are not signed in.</Typography>
      <StyledFirebaseAuth
        firebaseAuth={auth}
        uiConfig={{
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          ],
          signInFlow: "popup",
          callbacks: {
            signInSuccessWithAuthResult(result) {
              const isNew = result.additionalUserInfo.isNewUser;
              const { name } = result.additionalUserInfo.profile;

              if (isNew) {
                enqueueSnackbar(`Registered as ${name}`, {
                  variant: "success",
                });
              } else {
                enqueueSnackbar(`Signed in as ${name}`, {
                  variant: "success",
                });
              }
              return false;
            },
            async signInFailure(err) {
              enqueueSnackbar(err.message, {
                variant: "error",
              });
            },
          },
        }}
      />
    </div>
  );
};

export default NotLoggedIn;
