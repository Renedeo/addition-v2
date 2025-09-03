import type { IStorageService } from '../ThemeContext.types';

/**
 * Implementation of IStorageService using browser's localStorage
 * This service handles theme persistence in the browser
 */
export class LocalStorageService implements IStorageService {
  /**
   * Retrieve an item from localStorage
   * @param key - The key to retrieve
   * @returns The value if found, null otherwise
   */
  getItem(key: string): string | null {
    try {
      if (typeof window === 'undefined') {
        // Server-side rendering fallback
        return null;
      }
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get item from localStorage with key "${key}":`, error);
      return null;
    }
  }

  /**
   * Store an item in localStorage
   * @param key - The key to store under
   * @param value - The value to store
   */
  setItem(key: string, value: string): void {
    try {
      if (typeof window === 'undefined') {
        // Server-side rendering fallback
        return;
      }
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to set item in localStorage with key "${key}":`, error);
    }
  }

  /**
   * Remove an item from localStorage
   * @param key - The key to remove
   */
  removeItem(key: string): void {
    try {
      if (typeof window === 'undefined') {
        // Server-side rendering fallback
        return;
      }
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove item from localStorage with key "${key}":`, error);
    }
  }
}