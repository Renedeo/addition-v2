import { ThemeColors } from '../colors';
import { Typography } from '../typography';
import { Spacing } from '../spacing';

/**
 * Main theme interface that combines all design tokens.
 * 
 * @example
 * ```ts
 * const theme: Theme = {
 *   colors: { primary: { 500: '#3b82f6' }, background: '#ffffff' },
 *   fontFamily: { sans: ['Inter', 'sans-serif'] },
 *   fontSize: { base: ['1rem', { lineHeight: '1.5rem' }] },
 *   fontWeight: { normal: '400' },
 *   letterSpacing: { normal: '0em' },
 *   lineHeight: { normal: '1.5' },
 *   spacing: { 4: '1rem' },
 *   borderRadius: { md: '0.375rem' },
 *   boxShadow: { sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }
 * };
 * 
 * // Usage in components
 * const buttonStyles = {
 *   backgroundColor: theme.colors.primary[500],
 *   padding: theme.spacing[4],
 *   borderRadius: theme.borderRadius.md,
 *   boxShadow: theme.boxShadow.sm
 * };
 * ```
 */
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

/**
 * Theme mode options for light and dark themes.
 * 
 * @example
 * ```ts
 * const currentMode: ThemeMode = 'light';
 * 
 * // Toggle theme mode
 * const toggleMode = (mode: ThemeMode): ThemeMode => 
 *   mode === 'light' ? 'dark' : 'light';
 * ```
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Theme configuration object containing both light and dark themes.
 * 
 * @example
 * ```ts
 * const themeConfig: ThemeConfig = {
 *   light: lightTheme,
 *   dark: darkTheme
 * };
 * 
 * // Get theme by mode
 * const getTheme = (mode: ThemeMode) => themeConfig[mode];
 * const currentTheme = getTheme('light');
 * ```
 */
export interface ThemeConfig {
  light: Theme;
  dark: Theme;
}

/**
 * Utility type for theme property keys.
 * @example type Property = ThemeProperty; // 'colors' | 'fontFamily' | 'fontSize' | ...
 */
export type ThemeProperty = keyof Theme;

/**
 * Utility type for creating mode-specific configurations.
 * 
 * @example
 * ```ts
 * const modeColors: ThemeModeConfig<string> = {
 *   light: '#ffffff',
 *   dark: '#000000'
 * };
 * 
 * const getColorByMode = (mode: ThemeMode) => modeColors[mode];
 * ```
 */
export type ThemeModeConfig<T> = Record<ThemeMode, T>;