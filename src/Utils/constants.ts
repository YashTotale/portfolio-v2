// External Imports
import preval from "preval.macro";

export const SIDEBAR_WIDTH = 240;
export const BUILD_TIME: number = preval`module.exports = Date.now();`;
export const isDev = process.env.NODE_ENV === "development";
