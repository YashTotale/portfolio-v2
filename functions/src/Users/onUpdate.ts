// External Imports
import { firestore as functionsFirestore, logger } from "firebase-functions";
import { QueryDocumentSnapshot, FieldValue } from "firebase-admin/firestore";

// Internal Imports
import { db } from "../helpers/admin";
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
    logger.log(`Removing like for '${book}'`);
    batch.update(bookDoc(book), {
      numLikes: FieldValue.increment(-1),
    });
  }
  for (const book of addedBooks) {
    const ref = bookDoc(book);
    const doc = await ref.get();

    if (doc.exists) {
      logger.log(`Adding like for '${book}'`);
      batch.update(ref, {
        numLikes: FieldValue.increment(1),
      });
    } else {
      logger.log(`Creating '${book}' book with 1 like`);
      batch.set(ref, {
        numLikes: 1,
      });
    }
  }

  await batch.commit();
};

const onUserUpdate = functionsFirestore
  .document(`${USER_COLLECTION}/{userId}`)
  .onUpdate(async (change) => {
    const before = change.before as QueryDocumentSnapshot<UserDoc>;
    const after = change.after as QueryDocumentSnapshot<UserDoc>;

    const beforeData = before.data();
    const afterData = after.data();

    await updateBookLikes(beforeData, afterData);
  });

export default onUserUpdate;
