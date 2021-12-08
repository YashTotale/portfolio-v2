#!/usr/bin/env ts-node

// External Imports
import { Output } from "@hack4impact/logger";
import yargs from "yargs";

const args = yargs(process.argv.slice(2))
  .option("dry-run", {
    default: false,
    boolean: true,
  })
  .option("emulator", {
    default: false,
    boolean: true,
  }).argv;
const { _: ids, "dry-run": dryRun, emulator } = args;

if (emulator) {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
  process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "localhost:9199";
  process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
}

// Firebase Imports
import { FieldValue } from "firebase-admin/firestore";
import { db, auth, bucket } from "../src/helpers/admin";
import { deleteCollection } from "../src/helpers/firestore";

process.on("unhandledRejection", (reason) => {
  throw reason;
});

const rootOutput = new Output();

const entry = async () => {
  try {
    if (dryRun) rootOutput.coloredLog("BgRed", "DRY RUN");
    if (!ids.length) throw new Error("No User IDs were entered.");
    await Promise.all(ids.map((id) => new DeleteUser(id.toString()).entry()));
    rootOutput.flush();
  } catch (e) {
    rootOutput.flush();
    throw e;
  }
};

class DeleteUser {
  private id: string;
  private output: Output;

  constructor(id: string) {
    this.id = id;
    this.output = rootOutput.nested();
  }

  async entry() {
    this.output.line();
    this.output.coloredLog("Bright", this.id);
    await Promise.all([
      this.deleteAuth(),
      this.deleteDoc(),
      this.deleteStorage(),
      this.removeBookLikes(),
    ]);
  }

  async deleteAuth() {
    const nested = this.output.nested();
    nested.log(`Deleting auth...`);
    if (!dryRun) await auth.deleteUser(this.id);
    nested.coloredLog("FgGreen", "Deleted auth!");
  }

  async deleteDoc() {
    const nested = this.output.nested();

    nested.log(`Deleting doc in 'users' collection...`);
    const ref = db.collection("users").doc(this.id);
    const doc = await ref.get();

    if (!doc.exists) {
      nested.coloredLog(
        "FgRed",
        `User '${this.id}' not found in 'users' collection.`
      );
      return;
    }

    if (!dryRun) await ref.delete();
    nested.coloredLog("FgGreen", `Deleted doc in 'users' collection!`);

    nested.log(`Deleting 'immutable' collection...`);
    const immutableRef = ref.collection("immutable");
    if (!dryRun) await deleteCollection(immutableRef);
    nested.coloredLog("FgGreen", `Deleted 'immutable' collection!`);
  }

  async deleteStorage() {
    const nested = this.output.nested();
    nested.log("Deleting stored files...");
    if (!dryRun)
      await bucket.deleteFiles({
        prefix: `users/${this.id}`,
      });
    nested.coloredLog("FgGreen", "Deleted stored files!");
  }

  async removeBookLikes() {
    const nested = this.output.nested();
    nested.log("Deleting book likes...");

    const collection = db.collection("books");
    const likedBooks = await collection
      .where("likes", "array-contains", this.id)
      .get();

    if (likedBooks.empty) {
      nested.coloredLog("FgGreen", "No liked books found!");
      return;
    }

    const batch = db.batch();

    const bookIds = likedBooks.docs.reduce((arr, doc) => {
      const docRef = collection.doc(doc.id);
      batch.update(docRef, {
        likes: FieldValue.arrayRemove(this.id),
      });
      return [...arr, `'${doc.id}'`];
    }, [] as string[]);

    if (!dryRun) await batch.commit();
    nested.coloredLog(
      "FgGreen",
      `Deleted book likes from ${bookIds.join(", ")}!`
    );
  }
}

entry();
