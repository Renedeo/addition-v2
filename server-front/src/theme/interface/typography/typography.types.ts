import { FontSizeTuple, FontWeightValue, StringRecord } from '../common.types';

/**
 * Font family definitions for different text types.
 * 
 * @example
 * ```ts
 * const fontFamilies: FontFamilies = {
 *   sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
 *   mono: ['var(--font-geist-mono)', 'Menlo', 'Monaco', 'monospace'],
 *   display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif']
 * };
 * ```
 */
export interface FontFamilies {
  sans: string[];
  mono: string[];
  display: string[];
}

/**
 * Font sizes with consistent tuple structure [fontSize, { lineHeight }].
 * 
 * @example
 * ```ts
 * const fontSizes: FontSizes = {
 *   xs: ['0.75rem', { lineHeight: '1rem' }],
 *   base: ['1rem', { lineHeight: '1.5rem' }],
 *   '2xl': ['1.5rem', { lineHeight: '2rem' }]
 * };
 * 
 * // Usage in CSS-in-JS
 * const styles = {
 *   fontSize: fontSizes.base[0],
 *   lineHeight: fontSizes.base[1].lineHeight
 * };
 * ```
 */
export interface FontSizes {
  xs: FontSizeTuple;
  sm: FontSizeTuple;
  base: FontSizeTuple;
  lg: FontSizeTuple;
  xl: FontSizeTuple;
  '2xl': FontSizeTuple;
  '3xl': FontSizeTuple;
  '4xl': FontSizeTuple;
  '5xl': FontSizeTuple;
  '6xl': FontSizeTuple;
  '7xl': FontSizeTuple;
  '8xl': FontSizeTuple;
  '9xl': FontSizeTuple;
}

/**
 * Font weight definitions using standard numeric values.
 * 
 * @example
 * ```ts
 * const fontWeights: FontWeights = {
 *   normal: '400',
 *   medium: '500',
 *   bold: '700'
 * };
 * 
 * // Usage in components
 * <Text fontWeight="medium">Medium weight text</Text>
 * ```
 */
export interface FontWeights extends StringRecord {
  thin: FontWeightValue;
  extralight: FontWeightValue;
  light: FontWeightValue;
  normal: FontWeightValue;
  medium: FontWeightValue;
  semibold: FontWeightValue;
  bold: FontWeightValue;
  extrabold: FontWeightValue;
  black: FontWeightValue;
}

/**
 * Letter spacing values for text spacing control.
 * 
 * @example
 * ```ts
 * const letterSpacings: LetterSpacings = {
 *   tight: '-0.025em',
 *   normal: '0em',
 *   wide: '0.025em'
 * };
 * 
 * // Usage in CSS
 * .title { letter-spacing: letterSpacings.wide; }
 * ```
 */
export interface LetterSpacings extends StringRecord {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

/**
 * Line height values for text vertical spacing.
 * 
 * @example
 * ```ts
 * const lineHeights: LineHeights = {
 *   tight: '1.25',
 *   normal: '1.5',
 *   relaxed: '1.625'
 * };
 * 
 * // Usage in components
 * <Paragraph lineHeight="relaxed">Relaxed paragraph text</Paragraph>
 * ```
 */
export interface LineHeights extends StringRecord {
  none: string;
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
}

/**
 * Complete typography configuration combining all typography-related properties.
 * 
 * @example
 * ```ts
 * const typography: Typography = {
 *   fontFamily: { sans: ['Inter', 'sans-serif'] },
 *   fontSize: { base: ['1rem', { lineHeight: '1.5rem' }] },
 *   fontWeight: { normal: '400' },
 *   letterSpacing: { normal: '0em' },
 *   lineHeight: { normal: '1.5' }
 * };
 * 
 * // Access typography values
 * const baseFont = typography.fontSize.base;
 * const normalWeight = typography.fontWeight.normal;
 * ```
 */
export interface Typography {
  fontFamily: FontFamilies;
  fontSize: FontSizes;
  fontWeight: FontWeights;
  letterSpacing: LetterSpacings;
  lineHeight: LineHeights;
}

/**
 * Utility type for font size keys.
 * @example type MyFontSize = FontSizeName; // 'xs' | 'sm' | 'base' | ...
 */
export type FontSizeName = keyof FontSizes;

/**
 * Utility type for font weight keys.
 * @example type MyFontWeight = FontWeightName; // 'thin' | 'normal' | 'bold' | ...
 */
export type FontWeightName = keyof FontWeights;

/**
 * Utility type for letter spacing keys.
 * @example type MyLetterSpacing = LetterSpacingName; // 'tight' | 'normal' | 'wide' | ...
 */
export type LetterSpacingName = keyof LetterSpacings;

/**
 * Utility type for line height keys.
 * @example type MyLineHeight = LineHeightName; // 'tight' | 'normal' | 'relaxed' | ...
 */
export type LineHeightName = keyof LineHeights;