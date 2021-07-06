// React Imports
import React, { FC, lazy, Suspense } from "react";
import { OverlayProps } from "./Overlay";
import Loading from "./Loading";

const Component = lazy(() => import("./Overlay"));

const Overlay: FC<OverlayProps> = (props) => {
  return (
    <Suspense fallback={<Loading {...props} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Overlay;
