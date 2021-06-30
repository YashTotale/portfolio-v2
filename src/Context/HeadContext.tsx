// React Imports
import React, { useState, createContext, FC } from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet";

interface Head {
  title: string;
}

const defaultValue: Head = {
  title: "",
};

const HeadContext = createContext(defaultValue);

export const HeadProvider: FC = ({ children }) => {
  const [title, setTitle] = useState("");

  const handleNewState = (state: any) => {
    const newTitle = state.title;

    if (newTitle !== title) {
      setTitle(newTitle);
    }
  };

  return (
    <HeadContext.Provider value={{ title }}>
      <Helmet onChangeClientState={handleNewState} />
      {children}
    </HeadContext.Provider>
  );
};

export const useHead = (): Head => useContext(HeadContext);

export const useTitle = (): Head["title"] => useHead().title;
