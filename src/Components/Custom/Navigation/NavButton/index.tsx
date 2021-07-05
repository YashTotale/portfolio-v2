// React Imports
import React, { FC, lazy, Suspense } from "react";
import { NavButtonProps } from "./NavButton";
import Loading from "./Loading";

const Component = lazy(() => import("./NavButton"));

const NavButton: FC<NavButtonProps> = (props) => {
  return (
    <Suspense fallback={<Loading {...props} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default NavButton;
