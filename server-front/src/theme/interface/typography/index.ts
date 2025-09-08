/**
 * Typography-related type exports.
 * 
 * @example
 * ```ts
 * import type { FontSizes, FontSizeName, Typography } from '@/theme/interface/typography';
 * 
 * const useTypography = (typography: Typography) => {
 *   const size: FontSizeName = 'base';
 *   return typography.fontSize[size];
 * };
 * ```
 */
export type {
  FontFamilies,
  FontSizes,
  FontWeights,
  LetterSpacings,
  LineHeights,
  Typography,
  FontSizeName,
  FontWeightName,
  LetterSpacingName,
  LineHeightName,
} from './typography.types';