#!/usr/bin/env ts-node

// External Imports
import { Output } from "@hack4impact/logger";

// Internal Imports
import { db, auth, bucket, firestore } from "../src/helpers/admin";

const ids = process.argv.slice(2);
const rootOutput = new Output();

const entry = async () => {
  try {
    if (!ids.length) throw new Error("No User IDs were entered.");
    await Promise.all(ids.map((id) => new DeleteUser(id).entry()));
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
    await auth.deleteUser(this.id);
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

    await ref.delete();
    this.output.coloredLog(
      "FgGreen",
      `Deleted doc in '${collection}' collection!`
    );
  }

  async deleteStorage() {
    this.output.log("Deleting stored files...");
    await bucket.deleteFiles({
      prefix: `users/${this.id}`,
    });
    this.output.coloredLog("FgGreen", "Deleted storage!");
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
        likes: firestore.FieldValue.arrayRemove(this.id),
      });
      bookIds.push(`'${doc.id}'`);
    });
    await batch.commit();
    this.output.coloredLog(
      "FgGreen",
      `Deleted book likes for ${bookIds.join(", ")}!`
    );
  }
}

entry();
