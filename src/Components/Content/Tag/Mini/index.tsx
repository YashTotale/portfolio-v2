// React Imports
import React, { FC, lazy, Suspense } from "react";
import { MiniProps } from "./Mini";
import Loading from "./Loading";

const Component = lazy(() => import("./Mini"));

const Mini: FC<MiniProps> = (props) => {
  return (
    <Suspense fallback={<Loading className={props.className} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Mini;
