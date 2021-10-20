// React Imports
import React, { FC, lazy, Suspense } from "react";

const Component = lazy(() => import("./Popup"));

const Popup: FC = (props) => {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
};

export default Popup;
