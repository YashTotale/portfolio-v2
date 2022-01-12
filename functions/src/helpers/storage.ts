// External Imports
import { basename, join } from "path";
import axios from "axios";

// Internal Imports
import { bucket } from "./admin";

interface FileURLOptions {
  path: string;
}

export const uploadFileFromURL = async (url: string, options: FileURLOptions) =>
  new Promise(async (resolve, reject) => {
    const fileName = basename(url);
    const destination = join(options.path, fileName);

    const file = bucket.file(destination);

    const { data, headers } = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    const contentType = headers["content-type"];

    const writeStream = file.createWriteStream({
      metadata: {
        contentType,
      },
    });

    writeStream.on("error", (err) => {
      reject(err);
    });

    writeStream.on("finish", async () => {
      const [metadata] = await file.getMetadata();
      resolve(metadata.mediaLink);
    });

    data.pipe(writeStream);
  });
