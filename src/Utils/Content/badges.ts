// Internal Imports
import { Badge } from "../types";

// Data Imports
import badges from "../../Data/badge.json";

export const getRawBadge = (id: string): Badge | null => {
  const all = (badges as unknown) as Record<string, Badge>;
  const single = all[id];

  if (!single) return null;
  return single;
};
