// React Imports
import React, { FC, useState } from "react";
import Section from "../Section";
import { useClosableSnackbar } from "../../../../Hooks";
import { User, useUser } from "../../../../Context/UserContext";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";

// Firebase Imports
import "firebase/auth";
import firebase, { useAuth } from "../../../../Utils/Config/firebase";
import { StyledFirebaseAuth } from "react-firebaseui";

// Material UI Imports
import {
  Avatar,
  Button,
  CircularProgress,
  InputAdornment,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Check, CloudUpload } from "@material-ui/icons";

const Profile: FC = () => {
  const user = useUser();

  return (
    <Section title="Profile">
      {user ? <LoggedIn user={user} /> : <NotLoggedIn />}
      <HorizontalDivider />
    </Section>
  );
};

const useLoggedInStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2),
  },
  info: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(0, 3, 2),

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  avatar: {
    height: theme.spacing(7),
    width: theme.spacing(7),
    margin: theme.spacing(1, 1.5),
  },
  input: {
    margin: theme.spacing(1, 1.5),
  },
  saveIcon: {
    cursor: "pointer",
  },
  savingSpinner: {
    color: theme.palette.text.primary,
  },
  emailInput: {
    cursor: "not-allowed",
  },
  logout: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    marginLeft: "auto",
  },
}));

interface LoggedInProps {
  user: User;
}

const LoggedIn: FC<LoggedInProps> = (props) => {
  const classes = useLoggedInStyles();
  const theme = useTheme();
  const auth = useAuth();
  const { enqueueSnackbar } = useClosableSnackbar();
  const [name, setName] = useState(props.user.name);
  const [isNameSaving, setNameSaving] = useState(false);

  const onNameSave = async () => {
    setNameSaving(true);
    try {
      await props.user.updateName(name);
      enqueueSnackbar("Saved Name", {
        variant: "success",
      });
    } catch (e: any) {
      const message = typeof e === "string" ? e : e.message;
      enqueueSnackbar(message || "An error occurred. Please try again.", {
        variant: "error",
      });
    } finally {
      setNameSaving(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <Avatar
          variant="rounded"
          src={props.user.picture}
          className={classes.avatar}
        />
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          type="text"
          label="Name"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {name === props.user.name ? (
                  <Tooltip title="Saved">
                    <Check fontSize="small" />
                  </Tooltip>
                ) : isNameSaving ? (
                  <CircularProgress
                    size={theme.spacing(2.5)}
                    className={classes.savingSpinner}
                  />
                ) : (
                  <Tooltip title="Save Name">
                    <CloudUpload
                      fontSize="small"
                      onClick={onNameSave}
                      className={classes.saveIcon}
                    />
                  </Tooltip>
                )}
              </InputAdornment>
            ),
          }}
          className={classes.input}
        />
        <TextField
          value={props.user.email}
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          disabled
          className={classes.input}
          inputProps={{
            className: classes.emailInput,
          }}
        />
      </div>
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
