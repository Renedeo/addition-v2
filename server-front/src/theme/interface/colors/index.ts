/**
 * Color-related type exports.
 * 
 * @example
 * ```ts
 * import type { BaseColors, SemanticColors, ColorShade } from '@/theme/interface/colors';
 * 
 * const useColors = (colors: BaseColors) => {
 *   const primary: ColorShade = '500';
 *   return colors.primary[primary];
 * };
 * ```
 */
export type {
  ColorPalette,
  BaseColors,
  SemanticColors,
  ThemeColors,
  ColorShade,
  SemanticColorName,
} from './colors.types';