// React Imports
import React, { FC, useEffect } from "react";
import { Redirect, useLocation } from "react-router";

const EXCLUDED: RegExp[] = [];

const ScrollToTop: FC = () => {
  const pathname = useLocation().pathname;
  const withTrailingSlash = pathname.charAt(pathname.length - 1) === "/";

  useEffect(() => {
    const newPathname = withTrailingSlash ? pathname.slice(0, -1) : pathname;
    const isExcluded = EXCLUDED.some((regexp) => regexp.test(newPathname));

    if (!isExcluded) window.scrollTo(0, 0);
  }, [pathname, withTrailingSlash]);

  if (withTrailingSlash) return <Redirect to={pathname.slice(0, -1)} />;

  return null;
};

export default ScrollToTop;
