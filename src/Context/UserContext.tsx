// React Imports
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";

// Firebase Imports
import "firebase/auth";
import firebase, { useAuth } from "../Utils/Config/firebase";

interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

export interface User extends UserInfo {
  updateName: (newName: string) => Promise<void>;
}

const mapFirebaseUser = (user: firebase.User | null): UserInfo | null => {
  if (user === null) return user;
  return {
    name: user.displayName ?? "",
    email: user.email ?? "",
    picture: user.photoURL ?? "",
  };
};

const UserContext = createContext<User | null>(null);

export const UserProvider: FC = ({ children }) => {
  const auth = useAuth();
  const [user, setUser] = useState<UserInfo | null>(
    mapFirebaseUser(auth.currentUser)
  );

  const updateName = async (newName: string) => {
    await auth.currentUser!.updateProfile({
      displayName: newName,
    });
    setUser({ ...user!, name: newName });
  };

  useEffect(
    () => auth.onAuthStateChanged((user) => setUser(mapFirebaseUser(user))),
    [auth]
  );

  return (
    <UserContext.Provider
      value={user === null ? null : { ...user, updateName }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): User | null => useContext(UserContext);
