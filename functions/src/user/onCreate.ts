// External Imports
import { firestore as functionsFirestore, logger } from "firebase-functions";

// Internal Imports
import { userDoc, USER_COLLECTION } from "../helpers/users";
import { UserDoc } from "../../../types/firestore";
import { uploadFileFromURL } from "../helpers/storage";

const uploadProfilePicture = async (uid: string, data: UserDoc) => {
  if (data.picture) {
    try {
      const url = await uploadFileFromURL(data.picture, {
        path: `users/${uid}/profile_pictures`,
      });
      await userDoc(uid).update({
        picture: url,
      });
    } catch (e) {
      logger.error("Unable to upload profile picture", e);
    }

    logger.log(`Uploaded profile picture`);
  }
};

const onUserCreate = functionsFirestore
  .document(`${USER_COLLECTION}/{userId}`)
  .onCreate(async (snap) => {
    const uid = snap.id;
    const userData = snap.data() as UserDoc;

    logger.log(`Running onCreate for '${userData.name}' (${uid})`);

    await Promise.all([uploadProfilePicture(uid, userData)]);
  });

export default onUserCreate;
