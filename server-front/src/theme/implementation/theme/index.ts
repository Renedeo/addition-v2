/**
 * Re-exports theme configurations and types.
 * 
 * @example
 * ```ts
 * import { theme, lightTheme, darkTheme, Theme, ThemeMode } from '@/theme/implementation/theme';
 * 
 * const currentTheme: Theme = theme.light;
 * const mode: ThemeMode = 'dark';
 * ```
 */
export { theme, lightTheme, darkTheme } from './theme';
export type { Theme, ThemeMode } from './theme';