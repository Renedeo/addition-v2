/**
 * Main export file for theme interfaces and types.
 * Provides TypeScript types for theme system type safety.
 * 
 * @example
 * ```ts
 * // Import common types
 * import type { 
 *   StringRecord, 
 *   ColorScale, 
 *   FontSizeTuple,
 *   ThemeValue 
 * } from '@/theme/interface';
 * 
 * // Import specific interface groups
 * import type { 
 *   Theme, 
 *   ThemeMode, 
 *   ThemeConfig 
 * } from '@/theme/interface';
 * 
 * import type { 
 *   ThemeColors, 
 *   BaseColors, 
 *   SemanticColors 
 * } from '@/theme/interface';
 * 
 * import type { 
 *   Typography, 
 *   FontSizes, 
 *   FontWeights 
 * } from '@/theme/interface';
 * 
 * import type { 
 *   Spacing, 
 *   SpacingScale, 
 *   BorderRadii 
 * } from '@/theme/interface';
 * 
 * // Use in component props
 * interface ButtonProps {
 *   size?: keyof FontSizes;
 *   color?: keyof BaseColors;
 *   spacing?: keyof SpacingScale;
 * }
 * 
 * // Use in theme provider
 * interface ThemeProviderProps {
 *   theme: Theme;
 *   mode: ThemeMode;
 *   children: React.ReactNode;
 * }
 * ```
 */

// Export common types
export type {
  StringRecord,
  StringArrayRecord,
  FontSizeWithLineHeight,
  FontSizeTuple,
  ColorScale,
  ColorName,
  FontWeightValue,
  ThemeValue,
  SizeVariant,
  BaseComponentProps,
} from './common.types';

// Export from each module
export type * from './theme';
export type * from './colors';
export type * from './typography';
export type * from './spacing';

// Re-export for convenience
export type { Theme, ThemeMode, ThemeConfig } from './theme';
export type { ThemeColors, ColorPalette, BaseColors, SemanticColors } from './colors';
export type { Typography, FontSizes, FontWeights } from './typography';
export type { Spacing, SpacingScale, BorderRadii, BoxShadows } from './spacing';