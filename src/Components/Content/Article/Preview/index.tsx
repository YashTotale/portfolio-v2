// React Imports
import React, { FC, lazy, Suspense } from "react";
import { PreviewProps } from "./Preview";
import Loading from "./Loading";

const Component = lazy(() => import("./Preview"));

const Preview: FC<PreviewProps> = (props) => {
  return (
    <Suspense fallback={<Loading className={props.className} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Preview;
