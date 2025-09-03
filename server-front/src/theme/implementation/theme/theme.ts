import { colors } from '../colors';
import { typography } from '../typography';
import { spacing } from '../spacing';

export const lightTheme = {
  colors: {
    ...colors,
    background: colors.white,
    foreground: colors.neutral[900],
    muted: colors.neutral[100],
    mutedForeground: colors.neutral[500],
    border: colors.neutral[200],
    input: colors.neutral[200],
    ring: colors.primary[600],
  },
  ...typography,
  ...spacing,
};

export const darkTheme = {
  colors: {
    ...colors,
    background: colors.neutral[950],
    foreground: colors.neutral[50],
    muted: colors.neutral[800],
    mutedForeground: colors.neutral[400],
    border: colors.neutral[800],
    input: colors.neutral[800],
    ring: colors.primary[400],
  },
  ...typography,
  ...spacing,
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export type Theme = typeof lightTheme;
export type ThemeMode = 'light' | 'dark';