// React Imports
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";

// Firebase Imports
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/Config/firebase";

const UserContext = createContext<User | null>(null);

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => onAuthStateChanged(auth, (user) => setUser(user)), []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = (): User | null => useContext(UserContext);
