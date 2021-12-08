// Internal Imports
import { Spacing, Direction, Color, Shade } from "../../../../types/firestore";

const SPACINGS_OBJ: Record<Spacing, null> = {
  "6": null,
  "8": null,
  "10": null,
};
export const SPACINGS = Object.keys(SPACINGS_OBJ);

const DIRECTIONS_OBJ: Record<Direction, null> = {
  ltr: null,
  rtl: null,
};
export const DIRECTIONS = Object.keys(DIRECTIONS_OBJ);

const COLORS_OBJ: Record<Color, null> = {
  amber: null,
  blue: null,
  cyan: null,
  deepOrange: null,
  deepPurple: null,
  green: null,
  indigo: null,
  lightBlue: null,
  lightGreen: null,
  lime: null,
  orange: null,
  pink: null,
  purple: null,
  red: null,
  teal: null,
  yellow: null,
};
export const COLORS = Object.keys(COLORS_OBJ);

const SHADES_OBJ: Record<Shade, null> = {
  "100": null,
  "200": null,
  "300": null,
  "400": null,
  "50": null,
  "500": null,
  "600": null,
  "700": null,
  "800": null,
  "900": null,
  A100: null,
  A200: null,
  A400: null,
  A700: null,
};
export const SHADES = Object.keys(SHADES_OBJ);
