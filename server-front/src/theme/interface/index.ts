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