// React Imports
import React, { FC } from "react";

// Material UI Imports
import { GenerateId } from "jss";
import createGenerateClassName from "@mui/styles/createGenerateClassName";
import StylesProvider from "@mui/styles/StylesProvider";

const generateClassNameOptions = (): GenerateId => {
  const isDev = process.env.NODE_ENV === "development";
  const isReactSnap = navigator.userAgent === "ReactSnap";

  return createGenerateClassName(
    isDev
      ? {}
      : {
          productionPrefix: isReactSnap ? "snap" : "jss",
        }
  );
};

export const ClassnameProvider: FC = ({ children }) => {
  return (
    <StylesProvider generateClassName={generateClassNameOptions()}>
      {children}
    </StylesProvider>
  );
};
