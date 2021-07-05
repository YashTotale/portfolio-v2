// React Imports
import React, { lazy, Suspense, forwardRef } from "react";
import { PreviewProps } from "./Preview";
import Loading from "./Loading";

const Component = lazy(() => import("./Preview"));

const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  return (
    <Suspense fallback={<Loading ref={ref} className={props.className} />}>
      <Component ref={ref} {...props} />
    </Suspense>
  );
});

export default Preview;
