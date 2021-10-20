// React Imports
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSearch } from "../Utils/funcs";

// Firebase Imports
import "firebase/analytics";
import { getAnalytics } from "../Utils/Config/firebase";

const useAnalytics = (title: string | null | undefined): void => {
  const location = useLocation();
  const search = getSearch(location.search);

  const isDev = process.env.NODE_ENV === "development";
  const isReactSnap = navigator.userAgent === "ReactSnap";

  const analytics = getAnalytics(!isReactSnap);

  useEffect(() => {
    if (title && !isReactSnap) {
      const data: Record<string, string> = {
        page_title: title,
        ...search,
      };

      if (isDev) data["traffic_type"] = "internal";

      analytics.logEvent("page_view", data);
    }
  }, [title, search, analytics, isDev, isReactSnap]);
};

export default useAnalytics;
