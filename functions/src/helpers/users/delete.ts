// External Imports
import { FieldValue } from "firebase-admin/firestore";
import { Output } from "@hack4impact/logger";

// Internal Imports
import { auth, bucket, db } from "../admin";
import { deleteCollection } from "../firestore";

interface ConstructorOptions {
  dryRun?: boolean;
}

class DeleteUser {
  private id: string;
  private output: Output;
  private dryRun: boolean;

  constructor(id: string, output: Output, options?: ConstructorOptions) {
    this.id = id;
    this.output = output;
    this.dryRun = options?.dryRun ?? false;
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
    this.output.flush();
  }

  private async deleteAuth() {
    const nested = this.output.nested();
    nested.log(`Deleting auth...`);
    if (!this.dryRun) await auth.deleteUser(this.id);
    nested.coloredLog("FgGreen", "Deleted auth!");
  }

  private async deleteDoc() {
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

    if (!this.dryRun) await ref.delete();
    nested.coloredLog("FgGreen", `Deleted doc in 'users' collection!`);

    nested.log(`Deleting 'immutable' collection...`);
    const immutableRef = ref.collection("immutable");
    if (!this.dryRun) await deleteCollection(immutableRef);
    nested.coloredLog("FgGreen", `Deleted 'immutable' collection!`);
  }

  private async deleteStorage() {
    const nested = this.output.nested();
    nested.log("Deleting stored files...");
    if (!this.dryRun)
      await bucket.deleteFiles({
        prefix: `users/${this.id}`,
      });
    nested.coloredLog("FgGreen", "Deleted stored files!");
  }

  private async removeBookLikes() {
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

    if (!this.dryRun) await batch.commit();
    nested.coloredLog(
      "FgGreen",
      `Deleted book likes from ${bookIds.join(", ")}!`
    );
  }
}

export default DeleteUser;
