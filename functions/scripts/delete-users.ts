#!/usr/bin/env ts-node

// External Imports
import { Output } from "@hack4impact/logger";
import yargs from "yargs";

const args = yargs(process.argv.slice(2))
  .option("dry-run", {
    default: false,
    boolean: true,
  })
  .option("emulator", {
    default: false,
    boolean: true,
  }).argv;
const { _: ids, "dry-run": dryRun, emulator } = args;

if (emulator) {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
  process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "localhost:9199";
  process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
}

// Internal Imports
import { userDoc } from "../src/helpers/users/constants";

process.on("unhandledRejection", (reason) => {
  throw reason;
});

const rootOutput = new Output();

const entry = async () => {
  try {
    if (dryRun) rootOutput.coloredLog("BgRed", "DRY RUN");
    if (!ids.length) throw new Error("No User IDs were entered.");

    await Promise.all(
      ids.map(async (id) => {
        const nested = rootOutput.nested();
        nested.line();
        nested.coloredLog("Bright", id);
        nested.log(`Deleting...`);
        if (!dryRun) await userDoc(id.toString()).delete({ exists: true });
        nested.coloredLog("FgGreen", "Deleted!");
      })
    );
    rootOutput.flush();
  } catch (e) {
    rootOutput.flush();
    throw e;
  }
};

entry();
