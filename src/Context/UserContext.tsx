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
import { useUser } from "reactfire";
import { onSnapshot } from "firebase/firestore";
import { getDocRef } from "../Controllers/helpers/firestore";
import {
  publicCollectionRef,
  immutableCollectionRef,
} from "../Controllers/user.controller";
import { ImmutableUserDoc, PublicUserDoc, WithId } from "../../types/firestore";

interface UserContextData {
  uid: string | null;
  publicData: PublicUserDoc | null;
  immutableData: ImmutableUserDoc | null;
}

const UserContext = createContext<UserContextData>({
  uid: null,
  immutableData: null,
  publicData: null,
});

export const UserProvider: FC = ({ children }) => {
  const { data: user } = useUser();
  const uid = user?.uid;

  const [publicData, setPublicData] = useState<PublicUserDoc | null>(null);
  const [immutableData, setImmutableData] = useState<ImmutableUserDoc | null>(
    null
  );

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
        uid: uid ?? null,
        publicData,
        immutableData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useFirestoreUser = (): Nullable<
  WithId<PublicUserDoc & ImmutableUserDoc>
> => {
  const { uid, publicData, immutableData } = useContext(UserContext);

  if (!uid || !publicData || !immutableData) return null;

  return {
    ...publicData,
    ...immutableData,
    id: uid,
  };
};

export function usePublicUserData(): Nullable<WithId<PublicUserDoc>> {
  const { publicData, uid } = useContext(UserContext);

  if (!uid || !publicData) return null;
  return { ...publicData, id: uid };
}

export function useImmutableUserData(): Nullable<WithId<ImmutableUserDoc>> {
  const { immutableData, uid } = useContext(UserContext);

  if (!uid || !immutableData) return null;
  return { ...immutableData, id: uid };
}
