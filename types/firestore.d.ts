export type WithId<T> = T & {
  id: string;
};

export type Spacing = "6" | "8" | "10";
export type Direction = "ltr" | "rtl";
export type ColorScheme = "primary" | "secondary";
export type Color =
  | "red"
  | "pink"
  | "purple"
  | "deepPurple"
  | "indigo"
  | "blue"
  | "lightBlue"
  | "cyan"
  | "teal"
  | "green"
  | "lightGreen"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "deepOrange";
export type Shade =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "A100"
  | "A200"
  | "A400"
  | "A700";
export interface UserColor {
  color: Color;
  shade: Shade;
}
export type UserTheme = Record<ColorScheme, UserColor>;

export interface UserDisplay {
  darkMode: boolean | null;
  spacing: Spacing;
  direction: Direction;
  theme: UserTheme;
  enableScrollProgressBar: boolean;
}

export interface UserDoc {
  email: string;
  name: string;
  picture: string;
  display: UserDisplay;
  likedBooks: string[];
}

export interface BookDoc {
  numLikes: number;
}
