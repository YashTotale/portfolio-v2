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
import firebase, { getAuth } from "../Utils/Config/firebase";

const UserContext = createContext<firebase.User | null>(null);

export const UserProvider: FC = ({ children }) => {
  const auth = getAuth();
  const [user, setUser] = useState<firebase.User | null>(auth.currentUser);

  useEffect(() => auth.onAuthStateChanged((user) => setUser(user)), [auth]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = (): firebase.User | null => useContext(UserContext);
