/* eslint-disable import/first */
// Externals
import { config } from "dotenv-safe";
import { mkdirSync } from "fs";
import rimraf from "rimraf";

config();

// Internals
import { DATA_DIR } from "./helpers";
import getData from "./get-data";
import cleanData from "./clean-data";

const setUp = () => {
  rimraf.sync(DATA_DIR);
  mkdirSync(DATA_DIR);
};

const data = async () => {
  setUp();

  await getData();
  await cleanData();
};

data();
