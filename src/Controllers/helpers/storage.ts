// External Imports
import { getExtension } from "mime";

// Firebase Imports
import "firebase/storage";
import { getStorage } from "../../Utils/Config/firebase";

export const validateFileSize = (file: File, mb = 5): void => {
  const size = file.size / 1000 / 1000; // Size in MB
  if (size > mb) {
    const formattedSize = size.toFixed(1);
    throw new Error(
      `File size must be less than ${mb} MB (Uploaded file size was ${formattedSize} MB)`
    );
  }
};

interface UploadOptions {
  path: string;
  fileName?: string;
}

export const uploadFile = async (
  file: File,
  options: UploadOptions
): Promise<string> => {
  const storage = getStorage();
  const ext = getExtension(file.type);
  const ref = storage
    .ref()
    .child(
      `${options.path}/${options.fileName ?? file.name}${ext ? `.${ext}` : ""}`
    );
  const upload = await ref.put(file);
  const url = await upload.ref.getDownloadURL();
  return url;
};
