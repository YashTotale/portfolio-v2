// React Imports
import React, { createContext, FC, useContext, useEffect } from "react";
import throttle from "lodash.throttle";
import isEqual from "lodash.isequal";
import merge from "lodash.merge";
import { DEFAULT_USER_DISPLAY } from "../Utils/constants";

// Redux Imports
import { useSelector } from "react-redux";
import { getDefaultDoc, updateDefaultDoc } from "../Redux/firebase.slice";
import { useAppDispatch } from "../Store";

// Firebase Imports
import { DeepPartial } from "../../types/general";
import { UserDisplay } from "../../types/firestore";
import { updateUserDisplay, useUserDoc } from "../Controllers/user.controller";

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
  const userDoc = useUserDoc();

  const { display: defaultDisplay } = useSelector(getDefaultDoc("users"));
  const updateFirestoreUserDisplay = throttle(updateUserDisplay, 10000);

  const changeDisplay: Display["changeDisplay"] = (value) => {
    const newDisplay = merge({}, defaultDisplay, value);

    dispatch(
      updateDefaultDoc({
        collection: "users",
        data: { display: newDisplay },
      })
    );

    if (userDoc) {
      try {
        updateFirestoreUserDisplay(userDoc.id, newDisplay);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (userDoc && !isEqual(userDoc.display, defaultDisplay)) {
      dispatch(
        updateDefaultDoc({
          collection: "users",
          data: { display: userDoc.display },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userDoc?.display]);

  return (
    <DisplayContext.Provider value={{ display: defaultDisplay, changeDisplay }}>
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplay = (): Display => useContext(DisplayContext);
