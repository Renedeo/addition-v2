/**
 * Constantes pour les formats de couleur supportés.
 * Utilisées pour éviter les erreurs de typage et garantir la cohérence.
 * 
 * @example
 * ```typescript
 * import { FormatConst } from './colorRepresentation.const';
 * 
 * const rgbColor = converter.convert(hexColor, FormatConst.HEX, FormatConst.RGB);
 * ```
 */
export const FormatConst = {
    /** Format RGB (Red, Green, Blue) */
    RGB: 'RGB',
    /** Format HSL (Hue, Saturation, Lightness) */
    HSL: 'HSL',
    /** Format HEX (Hexadécimal) */
    HEX: 'HEX'
} as const;
