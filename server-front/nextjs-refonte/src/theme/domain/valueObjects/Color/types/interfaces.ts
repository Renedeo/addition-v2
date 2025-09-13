/**
 * 🔌 Color Types - Interfaces
 * 
 * Contrats de service et interfaces pour le domaine Color.
 * Ce fichier applique le principe de ségrégation d'interface (ISP) en définissant
 * des contrats spécialisés et cohésifs.
 * 
 * ## Architecture Modulaire
 * - **Responsabilité**: Définition des contrats de service
 * - **Principe SOLID**: Interface Segregation Principle (ISP)
 * - **Couplage Faible**: Interfaces découplées et spécialisées
 * - **Testabilité**: Contrats facilement mockables pour les tests
 * 
 * ## Interfaces Définies
 * 
 * ### Core Interface
 * - `Color`: Interface principale du value object (forward declaration)
 * 
 * ### Service Interfaces
 * - `ColorValidator`: Contrat pour la validation des couleurs
 * - `ColorConverter`: Contrat pour les conversions de format
 * - `ColorUtilities`: Contrat pour les utilitaires d'accessibilité
 * - `ColorDomainValidator`: Contrat pour la validation métier
 * 
 * ## Avantages
 * - **Modularité**: Chaque interface a une responsabilité unique
 * - **Extensibilité**: Facile d'ajouter de nouveaux contrats
 * - **Inversion de Dépendance**: Dépendance vers les abstractions
 * - **Flexibilité**: Implémentations multiples possibles
 * 
 * ## Exemple d'Usage
 * ```typescript
 * import type { Color, ColorValidator } from './interfaces';
 * 
 * class HexValidator implements ColorValidator {
 *   validateHex(hex: string): boolean {
 *     return /^#[0-9A-F]{6}$/i.test(hex);
 *   }
 *   // ... autres méthodes
 * }
 * ```
 * 
 * @module types/interfaces
 * @version 1.0.0
 * @since 1.0.0
 * @author Theme System
 */

import type { RGBValues, HSLValues, ColorValidationResult } from './base';

/**
 * Interface principale représentant un objet Color (Value Object)
 * @interface Color
 */
export interface Color {
  /** @property {string} value - Valeur de couleur sous forme de chaîne */
  readonly value: string;
  /** @property {string} format - Format de la couleur (hex, rgb, etc.) */
  readonly format: string;
  /** @property {boolean} hasAlpha - Indique si la couleur a un canal alpha */
  readonly hasAlpha: boolean;
  
  /**
   * Convertit la couleur au format hexadécimal
   * @returns {string} Couleur au format hex (ex: "#FF0000")
   */
  toHex(): string;
  
  /**
   * Convertit la couleur en valeurs RGB
   * @returns {RGBValues} Objet contenant les valeurs r, g, b
   */
  toRgb(): RGBValues;
  
  /**
   * Convertit la couleur en valeurs RGBA
   * @returns {RGBAValues} Objet contenant les valeurs r, g, b, a
   */
  toRgba(): import('./base').RGBAValues;
  
  /**
   * Convertit la couleur en valeurs HSL
   * @returns {HSLValues} Objet contenant les valeurs h, s, l
   */
  toHsl(): HSLValues;
  
  /**
   * Convertit la couleur en valeurs HSLA
   * @returns {HSLAValues} Objet contenant les valeurs h, s, l, a
   */
  toHsla(): import('./base').HSLAValues;
  
  /**
   * Convertit la couleur en chaîne dans le format spécifié
   * @param {string} [format] - Format de sortie souhaité
   * @returns {string} Représentation textuelle de la couleur
   */
  toString(format?: string): string;
  
  /**
   * Calcule la luminance relative de la couleur
   * @returns {number} Valeur de luminance (0-1)
   */
  getLuminance(): number;
  
  /**
   * Calcule le ratio de contraste avec une autre couleur
   * @param {Color} other - Couleur à comparer
   * @returns {number} Ratio de contraste (1-21)
   */
  getContrast(other: Color): number;
  
  /**
   * Détermine si la couleur est considérée comme claire
   * @returns {boolean} True si la couleur est claire
   */
  isLight(): boolean;
  
  /**
   * Détermine si la couleur est considérée comme sombre
   * @returns {boolean} True si la couleur est sombre
   */
  isDark(): boolean;
  
  /**
   * Crée une nouvelle couleur avec la valeur alpha spécifiée
   * @param {number} alpha - Nouvelle valeur alpha (0-1)
   * @returns {Color} Nouvelle instance Color avec l'alpha modifié
   */
  withAlpha(alpha: number): Color;
  
  /**
   * Crée une nouvelle couleur plus claire
   * @param {number} amount - Quantité d'éclaircissement (0-1)
   * @returns {Color} Nouvelle instance Color éclaircie
   */
  lighten(amount: number): Color;
  
  /**
   * Crée une nouvelle couleur plus sombre
   * @param {number} amount - Quantité d'assombrissement (0-1)
   * @returns {Color} Nouvelle instance Color assombrie
   */
  darken(amount: number): Color;
  
  /**
   * Crée une nouvelle couleur plus saturée
   * @param {number} amount - Quantité de saturation (0-1)
   * @returns {Color} Nouvelle instance Color plus saturée
   */
  saturate(amount: number): Color;
  
  /**
   * Crée une nouvelle couleur moins saturée
   * @param {number} amount - Quantité de désaturation (0-1)
   * @returns {Color} Nouvelle instance Color moins saturée
   */
  desaturate(amount: number): Color;
  
  /**
   * Compare l'égalité avec une autre couleur
   * @param {Color} other - Couleur à comparer
   * @returns {boolean} True si les couleurs sont identiques
   */
  equals(other: Color): boolean;
  
  /**
   * Valide la couleur actuelle
   * @returns {boolean} True si la couleur est valide
   */
  isValid(): boolean;
}

/**
 * Interface pour la validation des formats de couleur
 * @interface ColorValidator
 */
export interface ColorValidator {
  /**
   * Valide un code couleur hexadécimal
   * @param {string} hex - Code hex à valider (ex: "#FF0000")
   * @returns {boolean} True si le format hex est valide
   */
  validateHex(hex: string): boolean;
  
  /**
   * Valide les valeurs RGB
   * @param {number} r - Composante rouge (0-255)
   * @param {number} g - Composante verte (0-255)
   * @param {number} b - Composante bleue (0-255)
   * @returns {boolean} True si les valeurs RGB sont valides
   */
  validateRGB(r: number, g: number, b: number): boolean;
  
  /**
   * Valide les valeurs HSL
   * @param {number} h - Teinte (0-360)
   * @param {number} s - Saturation (0-100)
   * @param {number} l - Luminosité (0-100)
   * @returns {boolean} True si les valeurs HSL sont valides
   */
  validateHSL(h: number, s: number, l: number): boolean;
  
  /**
   * Valide la valeur alpha
   * @param {number} alpha - Valeur alpha (0-1)
   * @returns {boolean} True si la valeur alpha est valide
   */
  validateAlpha(alpha: number): boolean;
}

/**
 * Interface pour les conversions entre formats de couleur
 * @interface ColorConverter
 */
export interface ColorConverter {
  /**
   * Convertit une couleur hex en valeurs RGB
   * @param {string} hex - Code couleur hexadécimal
   * @returns {RGBValues} Valeurs RGB correspondantes
   */
  hexToRgb(hex: string): RGBValues;
  
  /**
   * Convertit des valeurs RGB en code hexadécimal
   * @param {number} r - Composante rouge (0-255)
   * @param {number} g - Composante verte (0-255)
   * @param {number} b - Composante bleue (0-255)
   * @returns {string} Code couleur hexadécimal
   */
  rgbToHex(r: number, g: number, b: number): string;
  
  /**
   * Convertit des valeurs RGB en valeurs HSL
   * @param {number} r - Composante rouge (0-255)
   * @param {number} g - Composante verte (0-255)
   * @param {number} b - Composante bleue (0-255)
   * @returns {HSLValues} Valeurs HSL correspondantes
   */
  rgbToHsl(r: number, g: number, b: number): HSLValues;
  
  /**
   * Convertit des valeurs HSL en valeurs RGB
   * @param {number} h - Teinte (0-360)
   * @param {number} s - Saturation (0-100)
   * @param {number} l - Luminosité (0-100)
   * @returns {RGBValues} Valeurs RGB correspondantes
   */
  hslToRgb(h: number, s: number, l: number): RGBValues;
}

/**
 * Interface pour les utilitaires d'accessibilité et de calcul sur les couleurs
 * @interface ColorUtilities
 */
export interface ColorUtilities {
  /**
   * Calcule la luminance relative d'une couleur
   * @param {Color} color - Couleur à analyser
   * @returns {number} Valeur de luminance (0-1)
   */
  getLuminance(color: Color): number;
  
  /**
   * Calcule le ratio de contraste entre deux couleurs
   * @param {Color} color1 - Première couleur
   * @param {Color} color2 - Seconde couleur
   * @returns {number} Ratio de contraste (1-21)
   */
  getContrast(color1: Color, color2: Color): number;
  
  /**
   * Détermine si une couleur est considérée comme claire
   * @param {Color} color - Couleur à analyser
   * @returns {boolean} True si la couleur est claire
   */
  isLight(color: Color): boolean;
  
  /**
   * Détermine si une couleur est considérée comme sombre
   * @param {Color} color - Couleur à analyser
   * @returns {boolean} True si la couleur est sombre
   */
  isDark(color: Color): boolean;
}

/**
 * Interface pour la validation métier des couleurs
 * @interface ColorDomainValidator
 */
export interface ColorDomainValidator {
  /**
   * Valide une valeur de couleur selon les règles métier
   * @param {string} colorValue - Valeur de couleur à valider
   * @param {string} format - Format attendu de la couleur
   * @returns {ColorValidationResult} Résultat détaillé de la validation
   */
  validateColorValue(colorValue: string, format: string): ColorValidationResult;
}