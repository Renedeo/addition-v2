/**
 * Theme-related type exports.
 * 
 * @example
 * ```ts
 * import type { Theme, ThemeMode, ThemeConfig } from '@/theme/interface/theme';
 * 
 * const useTheme = (config: ThemeConfig, mode: ThemeMode): Theme => {
 *   return config[mode];
 * };
 * ```
 */
export type {
  Theme,
  ThemeMode,
  ThemeConfig,
  ThemeProperty,
  ThemeModeConfig,
} from './theme.types';