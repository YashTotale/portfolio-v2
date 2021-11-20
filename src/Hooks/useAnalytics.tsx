// React Imports
import { useEffect } from "react";
import { isDev } from "../Utils/constants";

// Firebase Imports
import { logEvent } from "firebase/analytics";
import { analytics } from "../Utils/Config/firebase";

const useAnalytics = (title: string | null | undefined): void => {
  useEffect(() => {
    if (title) {
      const data: Record<string, string> = {
        page_title: title,
      };

      if (isDev) data["traffic_type"] = "internal";

      logEvent(analytics, "page_view", data);
    }
  }, [title]);
};

export default useAnalytics;
