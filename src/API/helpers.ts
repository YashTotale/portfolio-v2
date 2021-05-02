import { Asset } from "contentful";

export const getImageUrl = (image: Asset): string => image.fields.file.url;
export const getImageTitle = (image: Asset): string => image.fields.title;
