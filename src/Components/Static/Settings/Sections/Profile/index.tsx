// React Imports
import React, { FC } from "react";
import LoggedIn from "./LoggedIn";
import SignOutButton from "./LoggedIn/SignOut";
import NotLoggedIn from "./LoggedOut";
import Section from "../../Section";
import HorizontalDivider from "../../../../Atomic/Divider/Horizontal";

// Firebase Imports
import { useUser } from "../../../../../Context/UserContext";

const Profile: FC = () => {
  const user = useUser();

  return (
    <Section title="Profile" rightAction={user ? <SignOutButton /> : undefined}>
      {user ? <LoggedIn user={user} /> : <NotLoggedIn />}
      <HorizontalDivider />
    </Section>
  );
};

export default Profile;
