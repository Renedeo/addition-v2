/**
 * Constantes globales de l'application.
 * Utilisées à travers tous les modules pour éviter la duplication.
 */

// Messages d'erreur courants
export const ERROR_MESSAGES = {
  INVALID_COLOR_FORMAT: "Format de couleur invalide",
  CONVERSION_NOT_SUPPORTED: "Conversion non supportée",
  VALUE_OUT_OF_RANGE: "Valeur hors limites",
  MISSING_REQUIRED_PARAM: "Paramètre requis manquant"
} as const;

// Limites de validation
export const VALIDATION_LIMITS = {
  RGB: { MIN: 0, MAX: 255 },
  HSL: { 
    HUE: { MIN: 0, MAX: 360 },
    SATURATION: { MIN: 0, MAX: 100 },
    LIGHTNESS: { MIN: 0, MAX: 100 }
  },
  ALPHA: { MIN: 0, MAX: 1 }
} as const;

// Configuration par défaut
export const DEFAULT_CONFIG = {
  DECIMAL_PRECISION: 2,
  DEFAULT_ALPHA: 1,
  INTERMEDIATE_FORMAT: 'RGB' as const
} as const;