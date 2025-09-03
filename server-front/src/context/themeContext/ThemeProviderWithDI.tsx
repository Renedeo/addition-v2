'use client';

import React, { useEffect, useState } from 'react';
import type { ThemeMode } from '@/theme/interface';
import type { ThemeProviderProps, IStorageService } from './ThemeContext.types';
import { ThemeContext } from './ThemeContext';
import { LocalStorageService } from './services/StorageService';

interface EnhancedThemeProviderProps extends ThemeProviderProps {
  storageService?: IStorageService;
  storageKey?: string;
}

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

