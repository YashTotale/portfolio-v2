// React Imports
import React, { FC } from "react";
import createGenerateClassName from "@mui/styles/createGenerateClassName";
import StylesProvider from "@mui/styles/StylesProvider";
import { StylesOptions } from "@mui/styles/StylesProvider";

let counter = 0;

const generateClassName: StylesOptions["generateClassName"] = (rule, sheet) => {
  const randomStr =
    Math.random().toString(36).substring(2, 4) +
    Math.random().toString(36).substring(2, 4);

  return `jss-${counter++}-${randomStr}`;
};

export const ClassnameProvider: FC = ({ children }) => {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <StylesProvider
      generateClassName={isDev ? createGenerateClassName() : generateClassName}
    >
      {children}
    </StylesProvider>
  );
};
