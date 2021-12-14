// External Imports
import { firestore as functionsFirestore, logger } from "firebase-functions";
import { QueryDocumentSnapshot, FieldValue } from "firebase-admin/firestore";

// Internal Imports
import { auth, db } from "../helpers/admin";
import { USER_COLLECTION } from "../helpers/users";
import { bookDoc } from "../helpers/books";
import { UserDoc } from "../../../types/firestore";

const updateBookLikes = async (before: UserDoc, after: UserDoc) => {
  const beforeBooks = before.likedBooks ?? [];
  const afterBooks = after.likedBooks ?? [];

  const removedBooks = beforeBooks.filter((b) => !afterBooks.includes(b));
  const addedBooks = afterBooks.filter((b) => !beforeBooks.includes(b));

  if (!removedBooks.length && !addedBooks.length) return;

  const batch = db.batch();

  for (const book of removedBooks) {
    batch.update(bookDoc(book), {
      numLikes: FieldValue.increment(-1),
    });
    logger.log(`Removed like for '${book}'`);
  }
  for (const book of addedBooks) {
    const ref = bookDoc(book);
    const doc = await ref.get();

    if (doc.exists) {
      batch.update(ref, {
        numLikes: FieldValue.increment(1),
      });
      logger.log(`Added like for '${book}'`);
    } else {
      batch.set(ref, {
        numLikes: 1,
      });
      logger.log(`Created '${book}' book with 1 like`);
    }
  }

  await batch.commit();
};

const updateUserName = async (uid: string, before: UserDoc, after: UserDoc) => {
  if (before.name !== after.name) {
    const record = await auth.updateUser(uid, {
      displayName: after.name,
    });
    logger.log(`Updated user name to '${record.displayName}'`);
  }
};

const updateUserPicture = async (
  uid: string,
  before: UserDoc,
  after: UserDoc
) => {
  if (before.picture !== after.picture) {
    const record = await auth.updateUser(uid, {
      photoURL: after.picture,
    });
    logger.log(`Updated user picture to '${record.photoURL}'`);
  }
};

const onUserUpdate = functionsFirestore
  .document(`${USER_COLLECTION}/{userId}`)
  .onUpdate(async (change) => {
    const before = change.before as QueryDocumentSnapshot<UserDoc>;
    const after = change.after as QueryDocumentSnapshot<UserDoc>;
    const uid = after.id;

    logger.log(`Running onUpdate for '${uid}'`);

    const beforeData = before.data();
    const afterData = after.data();

    await Promise.all([
      updateUserName(uid, beforeData, afterData),
      updateUserPicture(uid, beforeData, afterData),
      updateBookLikes(beforeData, afterData),
    ]);
  });

export default onUserUpdate;
