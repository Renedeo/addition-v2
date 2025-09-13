'use client';

import { createContext, useContext } from 'react';
import type { ThemeContextType } from './ThemeContext.types';

/**
 * React context for managing theme state across the application.
 * 
 * This context provides theme mode (light/dark) and theme switching functionality
 * to all child components. It should be used in conjunction with the ThemeProvider
 * component for proper initialization and state management.
 * 
 * @example
 * ```tsx
 * // Basic provider setup
 * <ThemeProvider defaultTheme="light">
 *   <App />
 * </ThemeProvider>
 * 
 * // Consumer usage
 * const { mode, toggleTheme } = useTheme();
 * ```
 * 
 * @context
 * @see {@link ThemeContextType} for the shape of the context value
 * @see {@link useTheme} for the hook to consume this context
 * @see {@link ThemeProvider} for the provider component
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Custom hook to access the theme context and manage theme state.
 * 
 * This hook provides access to the current theme mode and functions to change it.
 * It includes built-in error handling to ensure it's used within a ThemeProvider.
 * 
 * @throws {Error} When used outside of a ThemeProvider component
 * 
 * @returns {ThemeContextType} Theme context object containing:
 * - `mode`: Current theme mode ('light' | 'dark')
 * - `toggleTheme`: Function to toggle between light and dark themes
 * - `setTheme`: Function to set a specific theme mode
 * 
 * @example
 * ```tsx
 * import { useTheme } from '@/context/themeContext';
 * 
 * const ThemeToggle = () => {
 *   const { mode, toggleTheme } = useTheme();
 *   
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current: {mode} - Click to toggle
 *     </button>
 *   );
 * };
 * 
 * // Setting specific theme
 * const ThemeSelector = () => {
 *   const { setTheme } = useTheme();
 *   
 *   return (
 *     <div>
 *       <button onClick={() => setTheme('light')}>Light Theme</button>
 *       <button onClick={() => setTheme('dark')}>Dark Theme</button>
 *     </div>
 *   );
 * };
 * 
 * // Using theme mode for conditional styling
 * const ThemedComponent = () => {
 *   const { mode } = useTheme();
 *   
 *   const styles = {
 *     backgroundColor: mode === 'light' ? '#ffffff' : '#1a1a1a',
 *     color: mode === 'light' ? '#000000' : '#ffffff'
 *   };
 *   
 *   return <div style={styles}>Theme-aware content</div>;
 * };
 * ```
 * 
 * @since 1.0.0
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeContext };