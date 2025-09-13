import type { ThemeMode } from '@/theme/interface';

/**
 * Type definition for the theme context value.
 * 
 * This interface defines the shape of the context object provided by the ThemeProvider
 * and consumed by the useTheme hook. It includes the current theme mode and functions
 * to modify the theme state.
 * 
 * @interface ThemeContextType
 * 
 * @example
 * ```tsx
 * // Usage in a component
 * const { mode, toggleTheme, setTheme }: ThemeContextType = useTheme();
 * 
 * // Conditional rendering based on theme
 * if (mode === 'dark') {
 *   return <DarkModeComponent />;
 * }
 * 
 * // Programmatic theme switching
 * const switchToDark = () => setTheme('dark');
 * const switchToLight = () => setTheme('light');
 * ```
 */
export interface ThemeContextType {
  /**
   * Current theme mode.
   * 
   * @type {ThemeMode}
   * @description The active theme mode, either 'light' or 'dark'.
   * Used to determine which theme values to apply across the application.
   * 
   * @example
   * ```tsx
   * const { mode } = useTheme();
   * const isDark = mode === 'dark';
   * ```
   */
  mode: ThemeMode;

  /**
   * Function to toggle between light and dark themes.
   * 
   * @function toggleTheme
   * @returns {void}
   * @description Switches the current theme mode. If currently 'light', switches to 'dark' and vice versa.
   * The new theme state is automatically persisted using the configured storage service.
   * 
   * @example
   * ```tsx
   * const { toggleTheme } = useTheme();
   * 
   * // Simple toggle button
   * <button onClick={toggleTheme}>Toggle Theme</button>
   * 
   * // With keyboard support
   * <button 
   *   onClick={toggleTheme}
   *   onKeyDown={(e) => e.key === 'Enter' && toggleTheme()}
   * >
   *   Switch Theme
   * </button>
   * ```
   */
  toggleTheme: () => void;

  /**
   * Function to set a specific theme mode.
   * 
   * @function setTheme
   * @param {ThemeMode} mode - The theme mode to set ('light' or 'dark')
   * @returns {void}
   * @description Sets the theme to a specific mode rather than toggling.
   * Useful for theme selection interfaces or programmatic theme changes.
   * The new theme state is automatically persisted using the configured storage service.
   * 
   * @example
   * ```tsx
   * const { setTheme } = useTheme();
   * 
   * // Theme selector component
   * const ThemeSelector = () => (
   *   <div>
   *     <button onClick={() => setTheme('light')}>
   *       Light Theme
   *     </button>
   *     <button onClick={() => setTheme('dark')}>
   *       Dark Theme
   *     </button>
   *   </div>
   * );
   * 
   * // System preference handler
   * useEffect(() => {
   *   const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
   *   const handleChange = (e: MediaQueryListEvent) => {
   *     setTheme(e.matches ? 'dark' : 'light');
   *   };
   *   
   *   mediaQuery.addEventListener('change', handleChange);
   *   return () => mediaQuery.removeEventListener('change', handleChange);
   * }, [setTheme]);
   * ```
   */
  setTheme: (mode: ThemeMode) => void;
}

/**
 * Props interface for the ThemeProvider component.
 * 
 * This interface defines the properties that can be passed to the ThemeProvider
 * component for configuration and initialization.
 * 
 * @interface ThemeProviderProps
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * // With default theme
 * <ThemeProvider defaultTheme="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export interface ThemeProviderProps {
  /**
   * React child components to wrap with theme context.
   * 
   * @type {React.ReactNode}
   * @description All child components will have access to the theme context
   * through the useTheme hook. This typically wraps the entire application
   * or a significant portion of the component tree.
   * 
   * @example
   * ```tsx
   * <ThemeProvider>
   *   <Header />
   *   <MainContent />
   *   <Footer />
   * </ThemeProvider>
   * ```
   */
  children: React.ReactNode;

  /**
   * Default theme mode to use when no saved preference exists.
   * 
   * @type {ThemeMode}
   * @optional
   * @default 'light'
   * @description The initial theme mode to use if no theme preference is found
   * in storage and no system preference is detected. Falls back to 'light' if not specified.
   * 
   * @example
   * ```tsx
   * // Default to dark theme
   * <ThemeProvider defaultTheme="dark">
   *   <App />
   * </ThemeProvider>
   * 
   * // System preference detection will override this if available
   * <ThemeProvider defaultTheme="light">
   *   <App />
   * </ThemeProvider>
   * ```
   */
  defaultTheme?: ThemeMode;
}

/**
 * Interface for storage service implementations used by the theme system.
 * 
 * This interface abstracts storage operations to allow for different storage
 * mechanisms (localStorage, sessionStorage, custom implementations) while
 * maintaining consistent behavior for theme persistence.
 * 
 * @interface IStorageService
 * 
 * @example
 * ```tsx
 * // Custom storage implementation
 * class SessionStorageService implements IStorageService {
 *   getItem(key: string): string | null {
 *     return sessionStorage.getItem(key);
 *   }
 *   
 *   setItem(key: string, value: string): void {
 *     sessionStorage.setItem(key, value);
 *   }
 *   
 *   removeItem(key: string): void {
 *     sessionStorage.removeItem(key);
 *   }
 * }
 * 
 * // Usage with custom storage
 * <ThemeProvider storageService={new SessionStorageService()}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export interface IStorageService {
  /**
   * Retrieve a value from storage by key.
   * 
   * @function getItem
   * @param {string} key - The storage key to retrieve
   * @returns {string | null} The stored value or null if not found
   * @description Retrieves a previously stored value. Should return null
   * if the key doesn't exist or if an error occurs during retrieval.
   * 
   * @example
   * ```tsx
   * const theme = storageService.getItem('theme'); // 'light' | 'dark' | null
   * ```
   */
  getItem(key: string): string | null;

  /**
   * Store a value in storage under the specified key.
   * 
   * @function setItem
   * @param {string} key - The storage key to use
   * @param {string} value - The value to store
   * @returns {void}
   * @description Persists a value in storage. Should handle errors gracefully
   * and not throw exceptions that would break the theme system.
   * 
   * @example
   * ```tsx
   * storageService.setItem('theme', 'dark');
   * ```
   */
  setItem(key: string, value: string): void;

  /**
   * Remove a value from storage by key.
   * 
   * @function removeItem
   * @param {string} key - The storage key to remove
   * @returns {void}
   * @description Removes a stored value. Used for clearing theme preferences
   * or resetting to default behavior.
   * 
   * @example
   * ```tsx
   * // Reset theme preference
   * storageService.removeItem('theme');
   * ```
   */
  removeItem(key: string): void;
}