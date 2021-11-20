// External Imports
import { getExtension } from "mime";

// Firebase Imports
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Utils/Config/firebase";

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
  const fileName = options.fileName ?? file.name;
  const originalExt = fileName.split(".").pop();
  const contentExt = getExtension(file.type);

  const fileRef = ref(
    storage,
    `${options.path}/${fileName}${originalExt ? "" : contentExt}`
  );
  const upload = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(upload.ref);
  return url;
};
