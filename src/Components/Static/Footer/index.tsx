// React Imports
import React, { FC, lazy, Suspense } from "react";
import Loading from "./Loading";

const Component = lazy(() => import("./Footer"));

const Footer: FC = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

export default Footer;
