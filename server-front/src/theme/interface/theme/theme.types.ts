import { ThemeColors } from '../colors';
import { Typography } from '../typography';
import { Spacing } from '../spacing';

// Main theme interface
export interface Theme {
  colors: ThemeColors;
  fontFamily: Typography['fontFamily'];
  fontSize: Typography['fontSize'];
  fontWeight: Typography['fontWeight'];
  letterSpacing: Typography['letterSpacing'];
  lineHeight: Typography['lineHeight'];
  spacing: Spacing['spacing'];
  borderRadius: Spacing['borderRadius'];
  boxShadow: Spacing['boxShadow'];
}

// Theme modes
export type ThemeMode = 'light' | 'dark';

// Theme configuration
export interface ThemeConfig {
  light: Theme;
  dark: Theme;
}

// Theme utilities
export type ThemeProperty = keyof Theme;
export type ThemeModeConfig<T> = Record<ThemeMode, T>;