/**
 * Utilitaires de validation génériques.
 * Fonctions réutilisables pour la validation des données.
 */

import { VALIDATION_LIMITS } from "@/shared/constants/app.constants";

/**
 * Vérifie si une valeur est dans une plage donnée.
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
};

/**
 * Vérifie si une valeur est un nombre valide.
 */
export const isValidNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Valide une valeur RGB (0-255).
 */
export const isValidRGBValue = (value: number): boolean => {
  return isInRange(value, VALIDATION_LIMITS.RGB.MIN, VALIDATION_LIMITS.RGB.MAX);
};

/**
 * Valide une valeur de teinte HSL (0-360).
 */
export const isValidHue = (value: number): boolean => {
  return isInRange(value, VALIDATION_LIMITS.HSL.HUE.MIN, VALIDATION_LIMITS.HSL.HUE.MAX);
};
console.log(isValidHue(370)); // false
/**
 * Valide une valeur de saturation/luminosité HSL (0-100).
 */
export const isValidPercentage = (value: number): boolean => {
  return isInRange(value, VALIDATION_LIMITS.HSL.SATURATION.MIN, VALIDATION_LIMITS.HSL.SATURATION.MAX);
};

/**
 * Valide une valeur alpha (0-1).
 */
export const isValidAlpha = (value: number): boolean => {
  return isInRange(value, VALIDATION_LIMITS.ALPHA.MIN, VALIDATION_LIMITS.ALPHA.MAX);
};

/**
 * Valide un format HEX.
 */
export const isValidHexFormat = (hex: string): boolean => {
  const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/;
  return hexRegex.test(hex);
};

/**
 * Normalise une valeur HEX (ajoute # si nécessaire).
 */
export const normalizeHex = (hex: string): string => {
  return hex.startsWith('#') ? hex : `#${hex}`;
};