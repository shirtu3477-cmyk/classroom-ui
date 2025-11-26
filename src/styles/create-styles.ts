import { CSSProperties } from "react";
import { SxProps } from "@mui/material";

type StyleSheetGenrator = (
  props: Record<string, any>
) => CSSProperties | SxProps<any>;

export type StyleSheet = {
  [key: string]: CSSProperties | SxProps<any> | StyleSheetGenrator;
};

export const createStyles = <T extends StyleSheet>(properties: T): T => {
  return properties;
};