// React Imports
import { useEffect } from "react";
import { useLocation } from "react-router";
import { getSearch } from "../Utils/funcs";
import { analytics } from "../Utils/Config/firebase";

const useAnalytics = (title: string | null | undefined): void => {
  const location = useLocation();
  const search = getSearch(location.search);
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (title) {
      const data: Record<string, string> = {
        page_title: title,
        ...search,
      };

      if (isDev) data["traffic_type"] = "internal";

      analytics.logEvent("page_view", data);
    }
  }, [title, search, isDev]);
};

export default useAnalytics;
