/**
 * 🎨 Color Value Object - Barrel Exports
 * 
 * Point d'entrée principal du module Color avec exports organisés
 * selon les principes de l'architecture modulaire.
 * 
 * @module Color
 * @version 1.0.0
 */

// ===============================
// 🎯 Exports principaux
// ===============================

// Types et interfaces (type-only imports recommandés)
export type {
  Color,
  ColorFormat,
  ColorOptions,
  RGBValues,
  RGBAValues,
  HSLValues,
  HSLAValues,
  ColorValidator,
  ColorConverter,
  ColorUtilities,
  ColorValidationResult
} from './types';

// Erreurs du domaine
export { ColorDomainError } from './types';

// Value Object principal et factories
export {
  ColorValue,
  createColor,
  createColorFromHex,
  createColorFromRgb,
  createColorFromHsl
} from './core';

// ===============================
// 🔧 Exports des services
// ===============================

// Validation
export {
  colorValidator,
  colorDomainValidator,
  isValidColor,
  assertValidColor
} from './validation';

// Conversion
export {
  colorConverter,
  advancedColorConverter,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb
} from './conversion';

// Utilitaires
export {
  colorUtilities,
  advancedColorUtilities,
  getLuminance,
  getContrast,
  isLight,
  isDark,
  isWcagAACompliant,
  isWcagAAACompliant
} from './utils';

// ===============================
//  Exports de documentation
// ===============================

/**
 * Constantes utiles pour le développement
 */
export const ColorConstants = {
  FORMATS: ['hex', 'rgb', 'rgba', 'hsl', 'hsla'] as const,
  CONTRAST_RATIOS: {
    AA_NORMAL: 4.5,
    AA_LARGE: 3,
    AAA_NORMAL: 7,
    AAA_LARGE: 4.5
  },
  RGB_RANGE: { min: 0, max: 255 },
  HSL_HUE_RANGE: { min: 0, max: 360 },
  HSL_PERCENT_RANGE: { min: 0, max: 100 },
  ALPHA_RANGE: { min: 0, max: 1 }
} as const;

// ===============================
// 📖 Re-exports pour compatibilité
// ===============================

// Export par défaut pour compatibilité
export { ColorValue as default } from './core';