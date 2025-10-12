import { FormatConst } from "@domain/ColorValue/core/constants/colorRepresentation.const";

/**
 * Type union représentant tous les formats de couleur supportés.
 * Dérivé automatiquement des constantes pour garantir la cohérence.
 */
export type ColorFormat = typeof FormatConst[keyof typeof FormatConst];

/**
 * Type représentant une valeur de couleur RGB.
 * Chaque composante doit être entre 0 et 255.
 * 
 * @example
 * ```typescript
 * const rgbValue: RGBColorValue = { r: 255, g: 87, b: 51 };
 * ```
 */
export type RGBColorValue = {
  /** Composante rouge (0-255) */
  r: number; 
  /** Composante verte (0-255) */
  g: number; 
  /** Composante bleue (0-255) */
  b: number
} 

/**
 * Type représentant une valeur de couleur HSL.
 * - h (hue): 0-360 degrés
 * - s (saturation): 0-100 %
 * - l (lightness): 0-100 %
 * 
 * @example
 * ```typescript
 * const hslValue: HSLColorValue = { h: 12, s: 88, l: 60 };
 * ```
 */
export type HSLColorValue = {
  /** Teinte en degrés (0-360) */
  h: number; 
  /** Saturation en pourcentage (0-100) */
  s: number; 
  /** Luminosité en pourcentage (0-100) */
  l: number
} 

/**
 * Type représentant une valeur de couleur HEX.
 * Contient une chaîne hexadécimale avec le préfixe #.
 * 
 * @example
 * ```typescript
 * const hexValue: HEXColorValue = { hex: '#ff5733' };
 * ```
 */
export type HEXColorValue = {
  /** Valeur hexadécimale avec préfixe # (ex: '#ff5733') */
  hex: string
}

// type ColorValue = RGBColorValue | HSLColorValue | HEXColorValue;
