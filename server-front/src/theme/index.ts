// Export implementations
export { theme, lightTheme, darkTheme } from './implementation';
export { colors } from './implementation';
export { typography } from './implementation';
export { spacing } from './implementation';

// Export context from dedicated context folder
export { ThemeProvider, useTheme } from '@/context/themeContext';

// Export types
export type {
  Theme,
  ThemeMode,
  ThemeColors,
  Typography,
  Spacing,
  ColorPalette,
} from './interface';

// Export context types
export type { ThemeContextType, ThemeProviderProps } from '@/context/themeContext';