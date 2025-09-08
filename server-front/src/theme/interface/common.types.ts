
/**
 * A record type for mapping string keys to string values.
 */
export interface StringRecord {
  [key: string]: string;
}

/**
 * A record type for mapping string keys to string array values.
 */
export interface StringArrayRecord {
  [key: string]: string[];
}

/**
 * Represents a font size with its associated line height.
 */
export interface FontSizeWithLineHeight {
  fontSize: string;
  lineHeight: string;
}

/**
 * Tuple representing a font size and its line height.
 * [fontSize, { lineHeight }]
 */
export type FontSizeTuple = [string, { lineHeight: string }];

/**
 * Interface for a color scale with keys from 50 to 950.
 */
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Supported base color names for the theme.
 */
export type ColorName = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';

/**
 * Supported font weight values as strings.
 */
export type FontWeightValue = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

/**
 * Common theme value type for string or number.
 */
export type ThemeValue = string | number;

/**
 * Supported size variants for components.
 */
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Common props for React components using the theme system.
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}