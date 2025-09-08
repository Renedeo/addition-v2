/**
 * Typography configuration object providing consistent font families, sizes, weights, and spacing.
 * Uses Geist fonts with system fallbacks and a harmonious scale for all text elements.
 * 
 * @example
 * ```ts
 * import { typography } from '@/theme/implementation';
 * 
 * // Access font families
 * const sansFont = typography.fontFamily.sans;     // ['var(--font-geist-sans)', 'system-ui', 'sans-serif']
 * const monoFont = typography.fontFamily.mono;     // ['var(--font-geist-mono)', 'Menlo', 'Monaco', 'monospace']
 * 
 * // Use font sizes with line heights
 * const [fontSize, { lineHeight }] = typography.fontSize.base;  // ['1rem', { lineHeight: '1.5rem' }]
 * const [titleSize, titleLine] = typography.fontSize['2xl'];     // ['1.5rem', { lineHeight: '2rem' }]
 * 
 * // Apply font weights
 * const normalWeight = typography.fontWeight.normal;     // '400'
 * const boldWeight = typography.fontWeight.bold;         // '700'
 * 
 * // Use in CSS-in-JS
 * const headingStyles = {
 *   fontFamily: typography.fontFamily.sans.join(', '),
 *   fontSize: typography.fontSize['2xl'][0],
 *   lineHeight: typography.fontSize['2xl'][1].lineHeight,
 *   fontWeight: typography.fontWeight.semibold,
 *   letterSpacing: typography.letterSpacing.tight
 * };
 * 
 * // Use in styled-components
 * const StyledText = styled.p`
 *   font-family: ${typography.fontFamily.sans.join(', ')};
 *   font-size: ${typography.fontSize.base[0]};
 *   line-height: ${typography.fontSize.base[1].lineHeight};
 *   font-weight: ${typography.fontWeight.normal};
 * `;
 * ```
 */
export const typography = {
  // Font families
  fontFamily: {
    sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
    mono: ['var(--font-geist-mono)', 'Menlo', 'Monaco', 'monospace'],
    display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
  },
  
  // Font sizes
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },
  
  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Line height
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};