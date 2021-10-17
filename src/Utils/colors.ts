// External Imports
import { getContrastRatio, Theme } from "@mui/material";

export const getTextColor = (theme: Theme, color: string): string => {
  const white = theme.palette.common.white;
  const black = theme.palette.common.black;

  return getContrastRatio(white, color) > getContrastRatio(black, color)
    ? white
    : black;
};
