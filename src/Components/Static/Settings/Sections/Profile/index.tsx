// React Imports
import React, { FC } from "react";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./LoggedOut";
import Section from "../../Section";
import { useUser } from "../../../../../Context/UserContext";
import HorizontalDivider from "../../../../Atomic/Divider/Horizontal";

const Profile: FC = () => {
  const user = useUser();

  return (
    <Section title="Profile">
      {user ? <LoggedIn user={user} /> : <NotLoggedIn />}
      <HorizontalDivider />
    </Section>
  );
};

export default Profile;
