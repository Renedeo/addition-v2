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