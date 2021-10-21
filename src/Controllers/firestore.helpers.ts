// React Imports
import { useCallback, useEffect } from "react";

// Firebase Imports
import "firebase/firestore";
import firebase, { getFirestore } from "../Utils/Config/firebase";

// Redux Imports
import { useSelector } from "react-redux";
import { getDoc, setDoc } from "../Redux";
import { useAppDispatch } from "../Store";

export type WithId<T> = T & {
  id: string;
};

export type Nullable<T> = T | undefined | null;

export type DocumentData = firebase.firestore.DocumentData;

export enum Collection {
  Users = "users",
  Books = "books",
  Contact = "contact",
  ContactErrors = "contact-errors",
}

export const createDocSnapshot = <T extends DocumentData>(
  collection: Collection
): ((id: string) => Nullable<WithId<T>>) => {
  const useDocSnapshot = (id: string) => {
    const firestore = getFirestore();
    const dispatch = useAppDispatch();
    const data = useSelector(getDoc<Nullable<WithId<T>>>(collection, id));

    const setData = useCallback(
      (d: Nullable<WithId<T>>) =>
        dispatch(
          setDoc({
            collection,
            docId: id,
            data: d,
          })
        ),
      [id, dispatch]
    );

    useEffect(() => {
      if (!id) setData(null);
      else
        return firestore
          .collection(collection)
          .doc(id)
          .onSnapshot((snap) => {
            if (!snap.exists) {
              setData(null);
            } else {
              const data = snap.data() as T;
              setData({ ...data, id: snap.id });
            }
          });
    }, [id, firestore, setData]);

    return data;
  };

  return useDocSnapshot;
};

export const createDoc = async <T extends DocumentData>(
  collection: Collection,
  data: T,
  id?: string
): Promise<T> => {
  const firestore = getFirestore();
  await firestore.collection(collection).doc(id).set(data);
  return data;
};

export const updateDoc = async (
  collection: Collection,
  id: string,
  data: firebase.firestore.UpdateData
): Promise<void> => {
  const firestore = getFirestore();
  return await firestore.collection(collection).doc(id).update(data);
};

export const updateOrCreateDoc = async (
  collection: Collection,
  id: string,
  data: DocumentData
): Promise<void> => {
  const firestore = getFirestore();
  return await firestore
    .collection(collection)
    .doc(id)
    .set(data, { merge: true });
};
