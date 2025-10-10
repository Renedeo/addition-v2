/**
 * Utilitaires de formatage et de conversion génériques.
 * Fonctions réutilisables pour le formatage de données.
 */

import { DEFAULT_CONFIG } from "@/shared/constants/app.constants";

/**
 * Arrondit un nombre à la précision spécifiée.
 * 
 * @param value - Le nombre à arrondir
 * @param precision - Nombre de décimales (par défaut selon DEFAULT_CONFIG)
 * @returns Le nombre arrondi
 * 
 * @example
 * ```typescript
 * roundToPrecision(3.14159, 2); // 3.14
 * roundToPrecision(255.7, 0);   // 256
 * ```
 */
export const roundToPrecision = (value: number, precision: number = DEFAULT_CONFIG.DECIMAL_PRECISION): number => {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};

/**
 * Convertit un nombre en string avec padding de zéros.
 * 
 * @param value - Le nombre à convertir
 * @param length - Longueur totale désirée de la chaîne
 * @returns String avec zéros de padding
 * 
 * @example
 * ```typescript
 * padWithZeros(42, 4); // "0042"
 * padWithZeros(7, 2);  // "07"
 * ```
 */
export const padWithZeros = (value: number, length: number): string => {
  return value.toString().padStart(length, '0');
};

/**
 * Convertit une valeur décimale en hexadécimal avec padding.
 */
export const toHexString = (value: number): string => {
  if (value < 0 || value > 255 || isNaN(value)) {
    throw new Error("La valeur doit être entre 0 et 255");
  }
  const hex = value.toString(16).toUpperCase();
  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * Convertit un pourcentage (0-100) en décimal (0-1).
 */
export const percentageToDecimal = (percentage: number): number => {
  return percentage / 100;
};

/**
 * Convertit un décimal (0-1) en pourcentage (0-100).
 */
export const decimalToPercentage = (decimal: number): number => {
  return decimal * 100;
};

/**
 * Clamp une valeur entre min et max.
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};

/**
 * Débounce une fonction.
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T, 
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};