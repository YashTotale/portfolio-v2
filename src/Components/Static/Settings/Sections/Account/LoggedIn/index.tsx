// React Imports
import React, { FC } from "react";
import ProfilePicture from "./ProfilePicture";
import Name from "./Name";
import Email from "./Email";
import LikedBooks from "./LikedBooks";
import Delete from "./Delete";
import HorizontalDivider from "../../../../../Atomic/Divider/Horizontal";

// Firebase Imports
import { User } from "firebase/auth";
import { useUserData } from "../../../../../../Context/UserContext";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2, 0),
  },
}));

interface LoggedInProps {
  user: User;
}

export interface ProfileProps extends LoggedInProps {
  userDoc: ReturnType<typeof useUserData>;
}

const LoggedIn: FC<LoggedInProps> = (props) => {
  const classes = useStyles();
  const userDoc = useUserData();

  const profileProps = {
    ...props,
    userDoc,
  };

  return (
    <div className={classes.container}>
      <div className={classes.userInfo}>
        <ProfilePicture {...profileProps} />
        <Name {...profileProps} />
        <Email {...profileProps} />
      </div>
      <HorizontalDivider />
      <LikedBooks {...profileProps} />
      <Delete />
    </div>
  );
};

export default LoggedIn;
