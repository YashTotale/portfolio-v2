// React Imports
import { useCallback, useEffect } from "react";

// Firebase Imports
import "firebase/firestore";
import firebase, { getFirestore } from "../Utils/Config/firebase";

// Redux Imports
import { useSelector } from "react-redux";
import { getDoc, setDoc } from "../Redux";
import { useAppDispatch } from "../Store";

// Internal Imports
import { UserDoc } from "./user.controller";
import { BookDoc } from "./books.controller";
import { ContactError } from "./contact.controller";

export type WithId<T> = T & {
  id: string;
};

export type Nullable<T> = T | undefined | null;

export type DocumentData = firebase.firestore.DocumentData;

export interface Schema {
  users: UserDoc;
  books: BookDoc;
  contact: Record<string, any>;
  "contact-errors": ContactError;
}

export type Collection = keyof Schema;

export const createDocSnapshot = <T extends Collection>(
  collection: T
): ((id: string) => Nullable<WithId<Schema[T]>>) => {
  const useDocSnapshot = (id: string) => {
    const firestore = getFirestore();
    const dispatch = useAppDispatch();
    const data = useSelector(
      getDoc<Nullable<WithId<Schema[T]>>>(collection, id)
    );

    const setData = useCallback(
      (d: Nullable<WithId<Schema[T]>>) =>
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
              const data = snap.data() as Schema[T];
              setData({ ...data, id: snap.id });
            }
          });
    }, [id, firestore, setData]);

    return data;
  };

  return useDocSnapshot;
};

export const createDoc = async <T extends Collection>(
  collection: T,
  data: Schema[T],
  id?: string
): Promise<Schema[T]> => {
  const firestore = getFirestore();
  await firestore.collection(collection).doc(id).set(data);
  return data;
};

export const updateDoc = async <T extends Collection>(
  collection: T,
  id: string,
  data: Partial<Record<keyof Schema[T], any>>
): Promise<void> => {
  const firestore = getFirestore();
  return await firestore.collection(collection).doc(id).update(data);
};

export const updateOrCreateDoc = async <T extends Collection>(
  collection: T,
  id: string,
  data: Partial<Record<keyof Schema[T], any>>
): Promise<void> => {
  const firestore = getFirestore();
  return await firestore
    .collection(collection)
    .doc(id)
    .set(data, { merge: true });
};
