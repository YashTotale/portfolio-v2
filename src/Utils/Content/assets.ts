// Data Imports
import { Asset } from "contentful";
import assets from "../../Data/assets.json";

export const getAssets = (): Record<string, Asset["fields"]> => {
  return assets as unknown as Record<string, Asset["fields"]>;
};

export const getAsset = (id: string): Asset["fields"] => getAssets()[id];
