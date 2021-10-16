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

export interface User {
  name: string;
  email: string;
  picture: string;
}

const mapFirebaseUser = (user: firebase.User | null): User | null => {
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
  const [user, setUser] = useState<User | null>(
    mapFirebaseUser(auth.currentUser)
  );

  useEffect(
    () => auth.onAuthStateChanged((user) => setUser(mapFirebaseUser(user))),
    [auth]
  );

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = (): User | null => useContext(UserContext);
