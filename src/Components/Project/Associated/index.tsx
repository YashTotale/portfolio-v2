// React Imports
import React, { FC, lazy, Suspense } from "react";
import { AssociatedProps } from "./Associated";
import Loading from "./Loading";

const Component = lazy(() => import("./Associated"));

const Associated: FC<AssociatedProps> = (props) => {
  // return <Loading className={props.className} />;
  return (
    <Suspense fallback={<Loading className={props.className} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Associated;
