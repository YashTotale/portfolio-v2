// React Imports
import React, { FC } from "react";
import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import { StylesOptions } from "@material-ui/styles/StylesProvider";

let counter = 0;

const generateClassName: StylesOptions["generateClassName"] = (rule, sheet) => {
  const randomStr =
    Math.random().toString(36).substring(2, 4) +
    Math.random().toString(36).substring(2, 4);

  return `jss-${randomStr}-${counter++}`;
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
