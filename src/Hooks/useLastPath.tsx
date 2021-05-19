// React Imports
import { useLocation } from "react-router";

const useLastPath = (): string => {
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const lastPath = parts[parts.length - 1];

  return lastPath;
};

export default useLastPath;
