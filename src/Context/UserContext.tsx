// React Imports
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { Nullable } from "../../types/general";

// Firebase Imports
import { onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { getUserDocRef } from "../Controllers/user.controller";
import { auth } from "../Utils/Config/firebase";
import { UserDoc, WithId } from "../../types/firestore";

interface UserContextData {
  user: User | null;
  userData: UserDoc | null;
}

const UserContext = createContext<UserContextData>({
  user: null,
  userData: null,
});

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<UserDoc | null>(null);

  const uid = user?.uid;

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    if (uid) {
      const userDocRef = getUserDocRef(uid);

      return onSnapshot(userDocRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setData(data);
        } else {
          setData(null);
        }
      });
    } else {
      setData(null);
    }
  }, [uid]);

  return (
    <UserContext.Provider
      value={{
        user,
        userData: data,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): User | null => {
  const { user } = useContext(UserContext);
  return user;
};

export const useUserData = (): Nullable<WithId<UserDoc>> => {
  const { user, userData } = useContext(UserContext);

  if (!user || !userData) return null;

  return {
    ...userData,
    id: user.uid,
  };
};
