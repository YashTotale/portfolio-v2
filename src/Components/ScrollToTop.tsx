// React Imports
import React, { FC, useEffect } from "react";
import { useLocation } from "react-router";

const EXCLUDED = [/^\/experience\/.+$/];

const ScrollToTop: FC = ({ children }) => {
  const pathname = useLocation().pathname;

  useEffect(() => {
    const isExcluded = EXCLUDED.some((regexp) => regexp.test(pathname));

    if (!isExcluded) window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
