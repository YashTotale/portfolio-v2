/* eslint-disable import/first */
// Externals
import { config } from "dotenv-safe";
import { mkdirSync } from "fs";
import rimraf from "rimraf";
import Logger from "@hack4impact/logger";

config();

// Internals
import { DATA_DIR } from "./helpers";
import getData from "./get-data";
import cleanData from "./clean-data";

const setUp = () => {
  Logger.log("Setting up data folder...");

  rimraf.sync(DATA_DIR);
  mkdirSync(DATA_DIR);

  Logger.success("Set up data folder!");
  Logger.line();
};

const data = async () => {
  Logger.log("Running data script...");
  Logger.line();

  setUp();
  await getData();
  await cleanData();

  Logger.success("Successfully ran data script!");
};

data();
