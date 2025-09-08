/**
 * Spacing-related type exports.
 * 
 * @example
 * ```ts
 * import type { SpacingScale, SpacingValue, BorderRadii } from '@/theme/interface/spacing';
 * 
 * const useSpacing = (spacing: SpacingScale) => {
 *   const value: SpacingValue = '4';
 *   return spacing[value];
 * };
 * ```
 */
export type {
  SpacingScale,
  BorderRadii,
  BoxShadows,
  Spacing,
  SpacingValue,
  BorderRadiusValue,
  BoxShadowValue,
} from './spacing.types';