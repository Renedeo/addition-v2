/**
 * @fileoverview Theme Context Module
 * 
 * This module provides a comprehensive theme management system for React applications
 * with support for light/dark modes, persistence, and dependency injection.
 * 
 * @module ThemeContext
 * @version 1.0.0
 * 
 * @example
 * ```tsx
 * // Basic setup in your app root
 * import { ThemeProvider } from '@/context/themeContext';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="light">
 *       <YourAppContent />
 *     </ThemeProvider>
 *   );
 * }
 * 
 * // Using the hook in components
 * import { useTheme } from '@/context/themeContext';
 * 
 * function ThemeToggle() {
 *   const { mode, toggleTheme } = useTheme();
 *   return (
 *     <button onClick={toggleTheme}>
 *       {mode === 'light' ? '🌙' : '☀️'}
 *     </button>
 *   );
 * }
 * ```
 * 
 * @see {@link https://reactjs.org/docs/context.html} React Context Documentation
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme} prefers-color-scheme Documentation
 */

// Core hook for consuming theme context
export { useTheme } from './ThemeContext';

// Provider component with dependency injection support
export { ThemeProvider } from './ThemeProviderWithDI';

// TypeScript interfaces and types
export type { 
  /** @see {@link ThemeContextType} */
  ThemeContextType, 
  /** @see {@link ThemeProviderProps} */
  ThemeProviderProps, 
  /** @see {@link IStorageService} */
  IStorageService 
} from './ThemeContext.types';

// Export storage services for custom implementations
export * from './services';