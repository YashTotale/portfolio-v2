// React Imports
import React, { FC, ReactElement, useEffect } from "react";
import { Waypoint } from "react-waypoint";

// Material UI Imports
import { useMediaQuery, useTheme } from "@material-ui/core";

type TrackerProps = Waypoint.WaypointProps & {
  children: ReactElement;
  canRemoveAll?: boolean;
  removeAll?: () => void;
  trackOnMedium?: boolean;
};

const Tracker: FC<TrackerProps> = (props) => {
  const {
    trackOnMedium = false,
    canRemoveAll,
    removeAll,
    children,
    ...waypointProps
  } = props;

  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!trackOnMedium && isMedium && canRemoveAll) {
      removeAll?.();
    }
  }, [isMedium, canRemoveAll, trackOnMedium, removeAll]);

  const waypoint = <Waypoint {...waypointProps}>{children}</Waypoint>;

  if (!trackOnMedium && isMedium) return children;
  return waypoint;
};

export default Tracker;
