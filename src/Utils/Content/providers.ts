// Internal Imports
import { createResolver, createSorter } from "../funcs";
import { Provider, ResolvedProvider } from "../types";
import { getAsset } from "./assets";

// Data Imports
import providers from "../../Data/provider.json";

export const getProviders = (): Provider[] => {
  return (Object.values(providers) as unknown) as Provider[];
};

export const getProvider = createResolver(
  (id: string): ResolvedProvider | null => {
    const single = getRawProvider(id);
    if (!single) return null;

    const image = getAsset(single.image);

    return { ...single, image };
  }
);

export const getRawProvider = (identifier: string): Provider | null => {
  const all = (providers as unknown) as Record<string, Provider>;
  const single = all[identifier];

  if (!single) return null;
  return single;
};

type ProviderSort = "Alphabetically";

export const sortProviders = createSorter<ProviderSort, Provider>(
  {
    Alphabetically: (a, b) => a.title.localeCompare(b.title),
  },
  getProviders()
);
