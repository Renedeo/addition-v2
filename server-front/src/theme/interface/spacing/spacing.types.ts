import { StringRecord } from '../common.types';

/**
 * Interface for the spacing scale (e.g., px, 0, 0.5, 1, ... 96).
 */
export interface SpacingScale extends StringRecord {
  px: string;
  0: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

/**
 * Interface for border radii values.
 */
export interface BorderRadii extends StringRecord {
  none: string;
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

/**
 * Interface for box shadow values.
 */
export interface BoxShadows extends StringRecord {
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

/**
 * Complete spacing interface including scale, border radius, and box shadow.
 */
export interface Spacing {
  spacing: SpacingScale;
  borderRadius: BorderRadii;
  boxShadow: BoxShadows;
}

/**
 * Utility type for spacing scale keys.
 */
export type SpacingValue = keyof SpacingScale;

/**
 * Utility type for border radius keys.
 */
export type BorderRadiusValue = keyof BorderRadii;

/**
 * Utility type for box shadow keys.
 */
export type BoxShadowValue = keyof BoxShadows;