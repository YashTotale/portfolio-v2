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
import { getDocRef } from "../Controllers/helpers/firestore";
import {
  publicCollectionRef,
  immutableCollectionRef,
} from "../Controllers/user.controller";
import { ImmutableUserDoc, PublicUserDoc, WithId } from "../../types/firestore";
import { auth } from "../Utils/Config/firebase";

interface UserContextData {
  user: User | null;
  publicData: PublicUserDoc | null;
  immutableData: ImmutableUserDoc | null;
}

const UserContext = createContext<UserContextData>({
  user: null,
  immutableData: null,
  publicData: null,
});

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [publicData, setPublicData] = useState<PublicUserDoc | null>(null);
  const [immutableData, setImmutableData] = useState<ImmutableUserDoc | null>(
    null
  );

  const uid = user?.uid;

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    if (uid) {
      const publicDocRef = getDocRef(publicCollectionRef, uid);
      return onSnapshot(publicDocRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setPublicData(data);
        } else {
          setPublicData(null);
        }
      });
    } else {
      setPublicData(null);
    }
  }, [uid]);

  useEffect(() => {
    if (uid) {
      const immutableDocRef = getDocRef(immutableCollectionRef, uid);

      return onSnapshot(immutableDocRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setImmutableData(data);
        } else {
          setImmutableData(null);
        }
      });
    } else {
      setImmutableData(null);
    }
  }, [uid]);

  return (
    <UserContext.Provider
      value={{
        user,
        publicData,
        immutableData,
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

export const useFirestoreUser = (): Nullable<
  WithId<PublicUserDoc & ImmutableUserDoc>
> => {
  const { user, publicData, immutableData } = useContext(UserContext);

  if (!user || !publicData || !immutableData) return null;

  return {
    ...publicData,
    ...immutableData,
    id: user.uid,
  };
};

export function usePublicUserData(): Nullable<WithId<PublicUserDoc>> {
  const { publicData, user } = useContext(UserContext);

  if (!user || !publicData) return null;
  return { ...publicData, id: user.uid };
}

export function useImmutableUserData(): Nullable<WithId<ImmutableUserDoc>> {
  const { immutableData, user } = useContext(UserContext);

  if (!user || !immutableData) return null;
  return { ...immutableData, id: user.uid };
}
