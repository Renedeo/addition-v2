// Common reusable interfaces
export interface StringRecord {
  [key: string]: string;
}

export interface StringArrayRecord {
  [key: string]: string[];
}

export interface FontSizeWithLineHeight {
  fontSize: string;
  lineHeight: string;
}

export type FontSizeTuple = [string, { lineHeight: string }];

// Color scale interface (50-950)
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

// Base color names
export type ColorName = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';

// Font weight values
export type FontWeightValue = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

// Common theme values
export type ThemeValue = string | number;

// Size variants
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Common props for React components
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}