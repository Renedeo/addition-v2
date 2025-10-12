/**
 * Point d'entrée principal pour tous les utilitaires partagés.
 * 
 * Ce fichier exporte toutes les constantes, types, utilitaires et hooks
 * génériques utilisés à travers l'application.
 * 
 * @example
 * ```typescript
 * // Import groupé
 * import { 
 *   ERROR_MESSAGES, 
 *   roundToPrecision,
 *   isValidHexFormat,
 *   useDebouncedValue 
 * } from '@/shared';
 * ```
 */

export { 
  ERROR_MESSAGES, 
  VALIDATION_LIMITS, 
  DEFAULT_CONFIG 
} from './constants/app.constants';

export { SATURATION_LEVELS } from './constants/saturation.constants';

export {
  roundToPrecision,
  padWithZeros,
  toHexString,
  percentageToDecimal,
  decimalToPercentage,
  clamp,
  debounce
} from './utils/format.utils';

export {
  isInRange,
  isValidNumber,
  isValidRGBValue,
  isValidHue,
  isValidPercentage,
  isValidAlpha,
  isValidHexFormat,
  normalizeHex
} from './utils/validation.utils';

export {
  useDebouncedValue,
  useControlledState,
  useErrorHandler
} from './hooks/common.hooks';

export type * from './types/common.types';

/**
 * Guide d'utilisation des utilitaires partagés :
 * 
 * ## Constantes
 * 
 * ### Messages d'erreur standardisés
 * ```typescript
 * import { ERROR_MESSAGES } from '@/shared';
 * throw new Error(ERROR_MESSAGES.INVALID_COLOR_FORMAT);
 * ```
 * 
 * ### Limites de validation
 * ```typescript
 * import { VALIDATION_LIMITS } from '@/shared';
 * const isValidRed = value >= VALIDATION_LIMITS.RGB.MIN && value <= VALIDATION_LIMITS.RGB.MAX;
 * ```
 * 
 * ## Utilitaires de formatage
 * 
 * ### Arrondi de précision
 * ```typescript
 * const rounded = roundToPrecision(3.14159, 2); // 3.14
 * ```
 * 
 * ### Conversion hexadécimale
 * ```typescript
 * const hex = toHexString(255); // "FF"
 * ```
 * 
 * ### Contrainte de valeur
 * ```typescript
 * const clamped = clamp(150, 0, 100); // 100
 * ```
 * 
 * ## Utilitaires de validation
 * 
 * ### Validation de format HEX
 * ```typescript
 * const isValid = isValidHexFormat('#ff5733'); // true
 * ```
 * 
 * ### Validation de plage RGB
 * ```typescript
 * const isValidRed = isValidRGBValue(255); // true
 * ```
 * 
 * ### Normalisation HEX
 * ```typescript
 * const normalized = normalizeHex('ff5733'); // '#ff5733'
 * ```
 * 
 * ## Hooks génériques
 * 
 * ### Valeur avec debounce
 * ```typescript
 * const [debouncedValue, setValue] = useDebouncedValue('initial', 300);
 * ```
 * 
 * ### État contrôlé/non-contrôlé
 * ```typescript
 * const [value, handleChange] = useControlledState(propValue, defaultValue, onChange);
 * ```
 * 
 * ### Gestion d'erreurs
 * ```typescript
 * const { error, clearError, handleError } = useErrorHandler();
 * ```
 */