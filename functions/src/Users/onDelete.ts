// External Imports
import { firestore as functionsFirestore, logger } from "firebase-functions";
import { FieldValue } from "firebase-admin/firestore";

// Internal Imports
import { auth, bucket, db } from "../helpers/admin";
import { USER_COLLECTION } from "../helpers/users/constants";
import { UserDoc } from "../../../types/firestore";
import { bookDoc } from "../helpers/books/constants";

const deleteAuth = async (uid: string) => {
  await auth.deleteUser(uid);
  logger.log("Deleted Auth!");
};

const deleteStorage = async (uid: string) => {
  await bucket.deleteFiles({
    prefix: `users/${uid}`,
  });
  logger.log("Deleted Storage!");
};

const removeBookLikes = async (data: UserDoc) => {
  const books = data.likedBooks ?? [];
  if (!books.length) return;

  const batch = db.batch();
  for (const book of books) {
    logger.log(`Removing like for '${book}'`);
    batch.update(bookDoc(book), {
      numLikes: FieldValue.increment(-1),
    });
  }
  await batch.commit();
};

const onUserDelete = functionsFirestore
  .document(`${USER_COLLECTION}/{userId}`)
  .onDelete(async (snap) => {
    const uid = snap.id;
    const userData = snap.data() as UserDoc;

    await Promise.all([
      deleteAuth(uid),
      deleteStorage(uid),
      removeBookLikes(userData),
    ]);
  });

export default onUserDelete;
