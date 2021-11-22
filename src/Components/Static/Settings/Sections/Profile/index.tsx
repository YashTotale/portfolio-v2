// React Imports
import React, { FC } from "react";
import LoggedIn from "./LoggedIn";
import SignOutButton from "./LoggedIn/SignOut";
import NotLoggedIn from "./LoggedOut";
import Section from "../../Section";
import HorizontalDivider from "../../../../Atomic/Divider/Horizontal";

// Firebase Imports
import { useSigninCheck } from "reactfire";

const Profile: FC = () => {
  const { status, data: userData } = useSigninCheck();
  const isSignedIn = status === "success" && userData.signedIn;

  return (
    <Section
      title="Profile"
      rightAction={isSignedIn ? <SignOutButton /> : undefined}
    >
      {isSignedIn ? <LoggedIn user={userData.user!} /> : <NotLoggedIn />}
      <HorizontalDivider />
    </Section>
  );
};

export default Profile;
