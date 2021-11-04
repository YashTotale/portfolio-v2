// React Imports
import React, { FC } from "react";
import ProfilePicture from "./ProfilePicture";
import Name from "./Name";
import Email from "./Email";

// Firebase Imports
import firebase from "../../../../../../Utils/Config/firebase";
import { useUserDoc } from "../../../../../../Controllers/user.controller";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2),
  },
}));

interface LoggedInProps {
  user: firebase.User;
}

export interface FieldProps extends LoggedInProps {
  userDoc: NonNullable<ReturnType<typeof useUserDoc>>;
}

const LoggedIn: FC<LoggedInProps> = (props) => {
  const classes = useStyles();
  const userDoc = useUserDoc();

  if (!userDoc) return null;

  return (
    <div className={classes.container}>
      <ProfilePicture {...props} userDoc={userDoc} />
      <Name {...props} userDoc={userDoc} />
      <Email {...props} userDoc={userDoc} />
    </div>
  );
};

export default LoggedIn;
