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
  id: string;
  name: string;
  email: string;
  picture: string;
}

export interface User extends UserInfo {
  updateName: (newName: string) => Promise<void>;
  updatePicture: (newPicture: string) => Promise<void>;
}

const mapFirebaseUser = (user: firebase.User | null): UserInfo | null => {
  if (user === null) return user;
  return {
    id: user.uid,
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

  const updatePicture = async (newPicture: string) => {
    await auth.currentUser!.updateProfile({
      photoURL: newPicture,
    });
    setUser({ ...user!, picture: newPicture });
  };

  useEffect(
    () => auth.onAuthStateChanged((user) => setUser(mapFirebaseUser(user))),
    [auth]
  );

  return (
    <UserContext.Provider
      value={user === null ? null : { ...user, updateName, updatePicture }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): User | null => useContext(UserContext);
