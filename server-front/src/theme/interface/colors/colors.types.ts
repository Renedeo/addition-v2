import { ColorScale } from '../common.types';

// Base color palette type
export type ColorPalette = ColorScale;

// Base colors structure
export interface BaseColors {
  primary: ColorPalette;
  secondary: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
  error: ColorPalette;
  neutral: ColorPalette;
  white: string;
  black: string;
  transparent: string;
}

// Theme-specific semantic colors
export interface SemanticColors {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
}

// Complete theme colors combining base and semantic
export interface ThemeColors extends BaseColors, SemanticColors {}

// Color utilities
export type ColorShade = keyof ColorPalette;
export type SemanticColorName = keyof SemanticColors;