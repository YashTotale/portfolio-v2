// React Imports
import React, { FC, lazy, Suspense } from "react";
import Loading from "./Loading";

const Component = lazy(() => import("./Sidebar"));

const Sidebar: FC = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Sidebar;
