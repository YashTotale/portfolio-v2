// React Imports
import { useCallback, useEffect } from "react";

// Firebase Imports
import "firebase/firestore";
import firebase, { getFirestore } from "../../Utils/Config/firebase";
import { Collections, Schema } from "../../../types/firestore";

// Redux Imports
import { useSelector } from "react-redux";
import { getDoc, setDoc } from "../../Redux";
import { ReduxDoc } from "../../Redux/firebase.slice";
import { useAppDispatch } from "../../Store";

export type DocumentData = firebase.firestore.DocumentData;

export const createDocSnapshot = <T extends Collections>(
  collection: T
): ((id: string) => ReduxDoc<T>) => {
  const useDocSnapshot = (id: string) => {
    const firestore = getFirestore();
    const dispatch = useAppDispatch();
    const data = useSelector(getDoc(collection, id));

    const setData = useCallback(
      (d: ReduxDoc<T>) =>
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

export const createDoc = async <T extends Collections>(
  collection: T,
  data: Schema[T],
  id?: string
): Promise<Schema[T]> => {
  const firestore = getFirestore();
  await firestore.collection(collection).doc(id).set(data);
  return data;
};

export const updateDoc = async <T extends Collections>(
  collection: T,
  id: string,
  data: Partial<Record<keyof Schema[T], any>>
): Promise<void> => {
  const firestore = getFirestore();
  return await firestore.collection(collection).doc(id).update(data);
};

export const updateOrCreateDoc = async <T extends Collections>(
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
