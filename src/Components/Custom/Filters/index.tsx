// React Imports
import React, { FC, lazy, Suspense } from "react";
import { FiltersProps } from "./Filters";
import Loading from "./Loading";

const Component = lazy(() => import("./Filters"));

const Filters: FC<FiltersProps> = (props) => {
  return (
    <Suspense fallback={<Loading className={props.className} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Filters;
