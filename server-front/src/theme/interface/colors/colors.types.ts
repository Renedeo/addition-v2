import { ColorScale } from '../common.types';

/**
 * A color palette based on a color scale (50-950).
 */
export type ColorPalette = ColorScale;

/**
 * Base colors structure for the theme, including primary, secondary, status, and neutral colors.
 */
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

/**
 * Semantic colors for theme UI elements (background, border, etc).
 */
export interface SemanticColors {
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
}

/**
 * Complete theme colors combining base and semantic colors.
 */
export interface ThemeColors extends BaseColors, SemanticColors {}

/**
 * Utility type for color shade keys (e.g., 50, 100, ... 950).
 */
export type ColorShade = keyof ColorPalette;

/**
 * Utility type for semantic color names.
 */
export type SemanticColorName = keyof SemanticColors;