#!/usr/bin/env ts-node

// External Imports
import { Output } from "@hack4impact/logger";
import yargs from "yargs";

// Firebase Imports
import { FieldValue } from "firebase-admin/firestore";
import { db, auth, bucket } from "../src/helpers/admin";

process.on("unhandledRejection", (reason) => {
  throw reason;
});

const args = yargs(process.argv.slice(2)).option("dry-run", {
  default: false,
  boolean: true,
}).argv;
const { _: ids, "dry-run": dryRun } = args;

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
      this.deleteDoc("users"),
      this.deleteDoc("users_immutable"),
      this.deleteStorage(),
      this.removeBookLikes(),
    ]);
  }

  async deleteAuth() {
    this.output.log(`Deleting auth...`);
    if (!dryRun) await auth.deleteUser(this.id);
    this.output.coloredLog("FgGreen", "Deleted auth!");
  }

  async deleteDoc(collection: string) {
    this.output.log(`Deleting doc in '${collection}' collection...`);
    const ref = db.collection(collection).doc(this.id);
    const doc = await ref.get();

    if (!doc.exists)
      throw new Error(
        `User '${this.id}' not found in '${collection}' collection.`
      );

    if (!dryRun) await ref.delete();
    this.output.coloredLog(
      "FgGreen",
      `Deleted doc in '${collection}' collection!`
    );
  }

  async deleteStorage() {
    this.output.log("Deleting stored files...");
    if (!dryRun)
      await bucket.deleteFiles({
        prefix: `users/${this.id}`,
      });
    this.output.coloredLog("FgGreen", "Deleted stored files!");
  }

  async removeBookLikes() {
    this.output.log("Deleting book likes...");
    const collection = db.collection("books");
    const likedBooks = await collection
      .where("likes", "array-contains", this.id)
      .get();

    if (likedBooks.empty) {
      this.output.coloredLog("FgGreen", "No liked books found!");
      return;
    }

    const batch = db.batch();
    const bookIds: string[] = [];
    likedBooks.docs.forEach((doc) => {
      const docRef = collection.doc(doc.id);
      batch.update(docRef, {
        likes: FieldValue.arrayRemove(this.id),
      });
      bookIds.push(`'${doc.id}'`);
    });
    if (!dryRun) await batch.commit();
    this.output.coloredLog(
      "FgGreen",
      `Deleted book likes for ${bookIds.join(", ")}!`
    );
  }
}

entry();
