// React Imports
import React, { FC, useEffect } from "react";
import { useState } from "react";
import { Redirect, useLocation } from "react-router";
import { useTitle } from "../../Context/HeadContext";

// Redux Imports
import { addToHistory, modifyLastHistory } from "../../Redux";
import { useAppDispatch } from "../../Store";

const NavController: FC = () => {
  const dispatch = useAppDispatch();
  const [prevPath, setPrevPath] = useState<string | null>(null);

  const pathname = useLocation().pathname;
  const title = useTitle();

  const withTrailingSlash = pathname.charAt(pathname.length - 1) === "/";
  const normalizedPath = withTrailingSlash ? pathname.slice(0, -1) : pathname;

  useEffect(() => {
    if (normalizedPath === prevPath) {
      dispatch(
        modifyLastHistory({
          pathname: normalizedPath,
          title,
        })
      );
    } else {
      dispatch(addToHistory({ pathname: normalizedPath, title }));
      setPrevPath(normalizedPath);
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedPath, title, dispatch]);

  if (withTrailingSlash) return <Redirect to={pathname.slice(0, -1)} />;

  return null;
};

export default NavController;
