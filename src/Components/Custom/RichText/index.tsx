// React Imports
import React, { FC, lazy, Suspense } from "react";
import { RichTextProps } from "./RichText";
import Loading from "./Loading";

const Component = lazy(() => import("./RichText"));

const RichText: FC<RichTextProps> = (props) => {
  return (
    <Suspense fallback={<Loading variant={props.variant} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default RichText;
