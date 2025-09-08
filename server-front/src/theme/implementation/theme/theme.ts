import { colors } from '../colors';
import { typography } from '../typography';
import { spacing } from '../spacing';

/**
 * Light theme configuration with appropriate colors for light mode.
 * Combines all design tokens with light-specific semantic colors.
 * 
 * @example
 * ```ts
 * import { lightTheme } from '@/theme/implementation';
 * 
 * // Use in CSS-in-JS
 * const lightStyles = {
 *   backgroundColor: lightTheme.colors.background,  // '#ffffff'
 *   color: lightTheme.colors.foreground,           // '#171717'
 *   borderColor: lightTheme.colors.border          // '#e5e5e5'
 * };
 * ```
 */
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

/**
 * Dark theme configuration with appropriate colors for dark mode.
 * Combines all design tokens with dark-specific semantic colors.
 * 
 * @example
 * ```ts
 * import { darkTheme } from '@/theme/implementation';
 * 
 * // Use in CSS-in-JS
 * const darkStyles = {
 *   backgroundColor: darkTheme.colors.background,  // '#0a0a0a'
 *   color: darkTheme.colors.foreground,           // '#fafafa'
 *   borderColor: darkTheme.colors.border          // '#262626'
 * };
 * ```
 */
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

/**
 * Complete theme configuration object containing both light and dark themes.
 * 
 * @example
 * ```ts
 * import { theme } from '@/theme/implementation';
 * 
 * // Get theme by mode
 * const currentTheme = theme.light;  // or theme.dark
 * 
 * // Toggle between themes
 * const getTheme = (mode: 'light' | 'dark') => theme[mode];
 * 
 * // Use in theme provider
 * const ThemeProvider = ({ mode, children }) => {
 *   const currentTheme = theme[mode];
 *   return (
 *     <StyledThemeProvider theme={currentTheme}>
 *       {children}
 *     </StyledThemeProvider>
 *   );
 * };
 * ```
 */
export const theme = {
  light: lightTheme,
  dark: darkTheme,
};

/**
 * TypeScript type derived from the light theme structure.
 * Ensures type safety when using theme values.
 */
export type Theme = typeof lightTheme;

/**
 * TypeScript type for theme mode selection.
 */
export type ThemeMode = 'light' | 'dark';