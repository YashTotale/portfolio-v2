// External Imports
import { getExtension } from "mime";

// Firebase Imports
import "firebase/storage";
import { getStorage } from "../../Utils/Config/firebase";

export const validateFileSize = (file: File, mb = 5): void => {
  const size = file.size / 1024 / 1024; // Size in MB
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

  const fileName = options.fileName ?? file.name;
  const originalExt = fileName.split(".").pop();
  const contentExt = getExtension(file.type);

  const ref = storage
    .ref()
    .child(`${options.path}/${fileName}${originalExt ? "" : contentExt}`);
  const upload = await ref.put(file);
  const url = await upload.ref.getDownloadURL();
  return url;
};
