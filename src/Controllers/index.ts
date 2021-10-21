// React Imports
import { useEffect, useState } from "react";

// Firebase Imports
import "firebase/firestore";
import firebase, { getFirestore } from "../Utils/Config/firebase";

export type WithId<T> = T & {
  id: string;
};

export type Nullable<T> = T | null;

export const createDocSnapshot = <T extends firebase.firestore.DocumentData>(
  collection: string
): ((id: string) => Nullable<WithId<T>>) => {
  const useDocSnapshot = (id: string) => {
    const firestore = getFirestore();
    const [data, setData] = useState<Nullable<WithId<T>>>(null);

    useEffect(
      () =>
        firestore
          .collection(collection)
          .doc(id)
          .onSnapshot((snap) => {
            if (!snap.exists) {
              setData(null);
            } else {
              const data = snap.data() as T;
              setData({ ...data, id: snap.id });
            }
          }),
      [id, firestore]
    );

    return data;
  };

  return useDocSnapshot;
};

export const updateDoc = async (
  collection: string,
  id: string,
  data: firebase.firestore.UpdateData
): Promise<void> => {
  const firestore = getFirestore();
  await firestore.collection(collection).doc(id).set(data, { merge: true });
};
