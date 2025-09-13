'use client';

import React, { useEffect, useState } from 'react';
import type { ThemeMode } from '@/theme/interface';
import type { ThemeProviderProps, IStorageService } from './ThemeContext.types';
import { ThemeContext } from './ThemeContext';
import { LocalStorageService } from './services/StorageService';

/**
 * Enhanced props for the ThemeProvider component with dependency injection capabilities.
 * Extends the base ThemeProviderProps with additional configuration options for storage.
 * 
 * @interface EnhancedThemeProviderProps
 * @extends ThemeProviderProps
 */
interface EnhancedThemeProviderProps extends ThemeProviderProps {
  /**
   * Custom storage service implementation for persisting theme preferences.
   * Allows for dependency injection of different storage mechanisms (localStorage, sessionStorage, etc.).
   * 
   * @default LocalStorageService
   * @optional
   */
  storageService?: IStorageService;
  
  /**
   * The key used to store the theme preference in the storage service.
   * This allows for custom naming of the storage key to avoid conflicts.
   * 
   * @default 'theme'
   * @optional
   */
  storageKey?: string;
}

/**
 * Enhanced Theme Provider component with dependency injection support.
 * 
 * This component provides theme context to child components while supporting:
 * - Automatic theme persistence using configurable storage services
 * - System preference detection (prefers-color-scheme)
 * - Dynamic theme switching with DOM class updates
 * - Dependency injection for testing and flexibility
 * 
 * The provider automatically:
 * 1. Loads saved theme preference from storage on mount
 * 2. Falls back to system preference if no saved theme exists
 * 3. Updates document classes when theme changes
 * 4. Persists theme changes to storage
 * 
 * @component
 * @param {EnhancedThemeProviderProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with theme context
 * @param {ThemeMode} [props.defaultTheme='light'] - Default theme mode if no preference is found
 * @param {IStorageService} [props.storageService=new LocalStorageService()] - Storage service for theme persistence
 * @param {string} [props.storageKey='theme'] - Storage key for theme preference
 * 
 * @example
 * ```tsx
 * // Basic usage with defaults
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * // With custom storage service
 * <ThemeProvider 
 *   storageService={new SessionStorageService()}
 *   storageKey="app-theme"
 *   defaultTheme="dark"
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 * 
 * @returns {JSX.Element} Provider component wrapping children with theme context
 */
export const ThemeProvider: React.FC<EnhancedThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  storageService = new LocalStorageService(),
  storageKey = 'theme',
}) => {
  const [mode, setMode] = useState<ThemeMode>(defaultTheme);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = storageService.getItem(storageKey) as ThemeMode;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setMode(savedTheme);
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
  }, [storageService, storageKey]);

  useEffect(() => {
    // Update document class and storage when theme changes
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(mode);
    }
    storageService.setItem(storageKey, mode);
  }, [mode, storageService, storageKey]);

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

