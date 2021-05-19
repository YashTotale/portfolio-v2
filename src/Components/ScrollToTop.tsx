// React Imports
import React, { FC, useEffect } from "react";
import { Redirect, useLocation } from "react-router";

const EXCLUDED = [/^\/experience\/.+$/];

const ScrollToTop: FC = () => {
  const pathname = useLocation().pathname;

  useEffect(() => {
    const isExcluded = EXCLUDED.some((regexp) => regexp.test(pathname));

    if (!isExcluded) window.scrollTo(0, 0);
  }, [pathname]);

  if (pathname.charAt(pathname.length - 1) === "/")
    return <Redirect to={pathname.slice(0, -1)} />;

  return null;
};

export default ScrollToTop;
