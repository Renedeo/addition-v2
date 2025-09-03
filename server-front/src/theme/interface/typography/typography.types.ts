import { FontSizeTuple, FontWeightValue, StringRecord } from '../common.types';

// Font families
export interface FontFamilies {
  sans: string[];
  mono: string[];
  display: string[];
}

// Font sizes with consistent tuple structure
export interface FontSizes {
  xs: FontSizeTuple;
  sm: FontSizeTuple;
  base: FontSizeTuple;
  lg: FontSizeTuple;
  xl: FontSizeTuple;
  '2xl': FontSizeTuple;
  '3xl': FontSizeTuple;
  '4xl': FontSizeTuple;
  '5xl': FontSizeTuple;
  '6xl': FontSizeTuple;
  '7xl': FontSizeTuple;
  '8xl': FontSizeTuple;
  '9xl': FontSizeTuple;
}

// Font weights using common type
export interface FontWeights extends StringRecord {
  thin: FontWeightValue;
  extralight: FontWeightValue;
  light: FontWeightValue;
  normal: FontWeightValue;
  medium: FontWeightValue;
  semibold: FontWeightValue;
  bold: FontWeightValue;
  extrabold: FontWeightValue;
  black: FontWeightValue;
}

// Letter spacings
export interface LetterSpacings extends StringRecord {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

// Line heights
export interface LineHeights extends StringRecord {
  none: string;
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
}

// Complete typography interface
export interface Typography {
  fontFamily: FontFamilies;
  fontSize: FontSizes;
  fontWeight: FontWeights;
  letterSpacing: LetterSpacings;
  lineHeight: LineHeights;
}

// Typography utilities
export type FontSizeName = keyof FontSizes;
export type FontWeightName = keyof FontWeights;
export type LetterSpacingName = keyof LetterSpacings;
export type LineHeightName = keyof LineHeights;