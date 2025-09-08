/**
 * Main export file for theme implementation.
 * Provides access to all theme values and configurations.
 * 
 * @example
 * ```ts
 * // Import individual modules
 * import { colors, typography, spacing, theme } from '@/theme/implementation';
 * 
 * // Import specific themes
 * import { lightTheme, darkTheme } from '@/theme/implementation';
 * 
 * // Import types
 * import type { Theme, ThemeMode } from '@/theme/implementation';
 * 
 * // Use in your application
 * const App = () => {
 *   const currentTheme = theme.light;
 *   
 *   return (
 *     <div style={{
 *       backgroundColor: currentTheme.colors.background,
 *       color: currentTheme.colors.foreground,
 *       padding: currentTheme.spacing[4],
 *       borderRadius: currentTheme.borderRadius.md
 *     }}>
 *       <h1 style={{
 *         fontSize: currentTheme.fontSize['2xl'][0],
 *         fontWeight: currentTheme.fontWeight.bold,
 *         fontFamily: currentTheme.fontFamily.sans.join(', ')
 *       }}>
 *         Hello World
 *       </h1>
 *     </div>
 *   );
 * };
 * ```
 */

// Direct exports from each module
export * from './colors';
export * from './typography';
export * from './spacing';

// Theme exports (explicit imports to avoid conflicts)
export { theme, lightTheme, darkTheme } from './theme/theme';
export type { Theme, ThemeMode } from './theme/theme';

// Re-export for convenience (named exports)
export { colors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';