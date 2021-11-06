// React Imports
import { useEffect } from "react";
import { isDev } from "../Utils/constants";

// Firebase Imports
import "firebase/analytics";
import { getAnalytics } from "../Utils/Config/firebase";

const useAnalytics = (title: string | null | undefined): void => {
  const analytics = getAnalytics();

  useEffect(() => {
    if (title) {
      const data: Record<string, string> = {
        page_title: title,
      };

      if (isDev) data["traffic_type"] = "internal";

      analytics.logEvent("page_view", data);
    }
  }, [title, analytics]);
};

export default useAnalytics;
