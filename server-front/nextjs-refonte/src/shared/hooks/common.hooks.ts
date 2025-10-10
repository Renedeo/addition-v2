/**
 * Custom React hooks partagés.
 * Hooks réutilisables pour la logique commune de l'application.
 */

import React, { useState, useCallback, useMemo } from 'react';

/**
 * Hook pour gérer une valeur avec debounce.
 */
export const useDebouncedValue = <T>(initialValue: T, delay: number = 300) => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  const debouncedUpdate = useMemo(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (newValue: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setDebouncedValue(newValue), delay);
    };
  }, [delay]);
  
  // Synchroniser avec les changements d'initialValue
  React.useEffect(() => {
    setValue(initialValue);
    debouncedUpdate(initialValue);
  }, [initialValue, debouncedUpdate]);

  const updateValue = useCallback((newValue: T) => {
    setValue(newValue);
    debouncedUpdate(newValue);
  }, [debouncedUpdate]);

  return [value, debouncedValue, updateValue] as const;
};

/**
 * Hook pour gérer l'état local avec callback de changement.
 */
export const useControlledState = <T>(
  value?: T,
  defaultValue?: T,
  onChange?: (value: T) => void
) => {
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = useCallback((newValue: T) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, onChange]);

  return [currentValue, handleChange] as const;
};

/**
 * Hook pour gérer les erreurs d'un composant.
 */
export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);
  
  const clearError = useCallback(() => setError(null), []);
  
  const handleError = useCallback((error: Error | string) => {
    const errorMessage = typeof error === 'string' ? error : error.message;
    setError(errorMessage);
  }, []);

  return { error, clearError, handleError };
};