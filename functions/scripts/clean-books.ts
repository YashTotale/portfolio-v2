#!/usr/bin/env ts-node

// External Imports
import { Output } from "@hack4impact/logger";

// Firebase Imports
import {
  CollectionReference,
  DocumentReference,
  FieldValue,
} from "firebase-admin/firestore";
import { auth, db } from "../src/helpers/admin";
import { BookDoc } from "../../types/firestore";

process.on("unhandledRejection", (reason) => {
  throw reason;
});

const rootOutput = new Output();
const USER_CACHE: Record<string, boolean> = {};

const entry = async () => {
  try {
    const ref = db.collection("books") as CollectionReference<BookDoc>;
    const books = await ref.listDocuments();
    await Promise.all(books.map(cleanBook));
    rootOutput.flush();
  } catch (e) {
    rootOutput.flush();
    throw e;
  }
};

const cleanBook = async (ref: DocumentReference<BookDoc>) => {
  const output = rootOutput.nested();
  output.line();
  output.coloredLog("Bright", ref.id);

  const book = await ref.get();
  const data = book.data();
  if (!data) return;

  output.log("Checking likes...");
  const likesResult = await Promise.all(data.likes.map(checkLike));
  const toRemove = likesResult.filter((x) => typeof x === "string");

  if (toRemove.length) {
    output.log(`Removing likes from deleted/unknown users...`);
    await ref.update({
      likes: FieldValue.arrayRemove(...toRemove),
    });
    output.coloredLog(`FgGreen`, `Removed '${toRemove.join(", ")}'!`);
  } else {
    output.coloredLog(`FgGreen`, "No likes to remove!");
  }
};

const checkLike = async (uid: string): Promise<string | null> => {
  const cached = USER_CACHE[uid];

  if (typeof cached === "boolean") {
    if (cached) return null;
    else return uid;
  }

  try {
    await auth.getUser(uid);
    USER_CACHE[uid] = true;
    return null;
  } catch (err: any) {
    if (err.code === "auth/user-not-found") {
      USER_CACHE[uid] = false;
      return uid;
    } else {
      throw err;
    }
  }
};

entry();
