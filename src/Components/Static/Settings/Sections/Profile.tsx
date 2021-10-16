// React Imports
import React, { FC } from "react";
import Section from "../Section";
import { useClosableSnackbar } from "../../../../Hooks";

// Firebase Imports
import "firebase/auth";
import firebase, { useAuth } from "../../../../Utils/Config/firebase";
import { StyledFirebaseAuth } from "react-firebaseui";

// Material UI Imports
import { Button, makeStyles, Typography } from "@material-ui/core";
import { useUser } from "../../../../Context/UserContext";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";

const Profile: FC = () => {
  const user = useUser();

  return (
    <Section title="Profile">
      {user ? <LoggedIn /> : <NotLoggedIn />}
      <HorizontalDivider />
    </Section>
  );
};

const useLoggedInStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
  },
  logout: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },
}));

const LoggedIn: FC = () => {
  const classes = useLoggedInStyles();
  const auth = useAuth();
  const { enqueueSnackbar } = useClosableSnackbar();

  return (
    <div className={classes.container}>
      <Button
        variant="outlined"
        onClick={() => {
          auth.signOut().then(() =>
            enqueueSnackbar("Signed Out", {
              variant: "success",
            })
          );
        }}
        className={classes.logout}
      >
        Sign Out
      </Button>
    </div>
  );
};

const useNotLoggedInStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
  },
}));

const NotLoggedIn: FC = () => {
  const classes = useNotLoggedInStyles();
  const auth = useAuth();
  const { enqueueSnackbar } = useClosableSnackbar();

  return (
    <div className={classes.container}>
      <Typography align="center">You are not signed in.</Typography>
      <StyledFirebaseAuth
        firebaseAuth={auth}
        uiConfig={{
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
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

export default Profile;
