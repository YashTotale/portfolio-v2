// React Imports
import React, { FC, lazy, Suspense } from "react";
import { BadgeProps } from "./Badge";
import Loading from "./Loading";

const Component = lazy(() => import("./Badge"));

const Badge: FC<BadgeProps> = (props) => {
  return (
    <Suspense fallback={<Loading className={props.className} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Badge;
