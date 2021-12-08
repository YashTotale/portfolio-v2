// React Imports
import React, { createContext, FC, useContext, useEffect } from "react";
import throttle from "lodash.throttle";
import isEqual from "lodash.isequal";
import merge from "lodash.merge";
import { DEFAULT_USER_DISPLAY } from "../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getUserDisplay,
  updateUserDisplay as updateReduxDisplay,
} from "../Redux";
import { useAppDispatch } from "../Store";

// Firebase Imports
import { usePublicUserData } from "./UserContext";
import { updateUserDisplay } from "../Controllers/user.controller";
import { DeepPartial } from "../../types/general";
import { UserDisplay } from "../../types/firestore";

interface Display {
  display: UserDisplay;
  changeDisplay: (value: DeepPartial<UserDisplay>) => void;
}

const DisplayContext = createContext<Display>({
  display: DEFAULT_USER_DISPLAY,
  changeDisplay: () => {
    return;
  },
});

export const DisplayProvider: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const userData = usePublicUserData();

  const display = useSelector(getUserDisplay);
  const updateFirestoreUserDisplay = throttle(updateUserDisplay, 10000);

  const changeDisplay: Display["changeDisplay"] = (value) => {
    const newDisplay = merge({}, display, value);
    dispatch(updateReduxDisplay(newDisplay));

    if (userData) {
      try {
        updateFirestoreUserDisplay(userData.id, newDisplay);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (userData && !isEqual(userData.display, display)) {
      dispatch(updateReduxDisplay(userData.display));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userData?.display]);

  return (
    <DisplayContext.Provider value={{ display, changeDisplay }}>
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplay = (): Display => useContext(DisplayContext);
