/**
 * 🎯 Color Types - Base Types
 * 
 * Types fondamentaux et primitifs pour le domaine Color.
 * Ce fichier applique le principe de responsabilité unique (SRP) en se concentrant
 * exclusivement sur les définitions de types de base.
 * 
 * ## Architecture Modulaire
 * - **Responsabilité**: Types primitifs et structures de données de base
 * - **Principe SOLID**: Single Responsibility Principle (SRP)
 * - **Réutilisabilité**: Types réutilisables dans tout le domaine Color
 * - **Immutabilité**: Tous les types sont readonly pour garantir l'immutabilité
 * 
 * ## Types Définis
 * - `ColorFormat`: Union type pour les formats supportés
 * - `RGBValues`, `RGBAValues`: Structures pour les valeurs RGB/RGBA
 * - `HSLValues`, `HSLAValues`: Structures pour les valeurs HSL/HSLA
 * - `ColorOptions`: Configuration pour la création de couleurs
 * - `ColorValidationResult`: Résultat de validation avec erreurs détaillées
 * - `ColorDomainError`: Classe d'erreur spécialisée du domaine
 * 
 * ## Exemple d'Usage
 * ```typescript
 * import type { ColorFormat, RGBValues } from './base';
 * 
 * const format: ColorFormat = 'hex';
 * const rgb: RGBValues = { r: 255, g: 0, b: 0 };
 * ```
 * 
 * @module types/base
 * @version 1.0.0
 * @since 1.0.0
 * @author Theme System
 */

/**
 * Union type définissant les formats de couleur supportés par le système
 * @typedef {'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla'} ColorFormat
 */
export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

/**
 * Interface représentant les valeurs RGB d'une couleur
 * @interface RGBValues
 * @property {number} r - Composante rouge (0-255)
 * @property {number} g - Composante verte (0-255)
 * @property {number} b - Composante bleue (0-255)
 */
export interface RGBValues {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

/**
 * Interface représentant les valeurs RGBA d'une couleur (RGB + transparence)
 * @interface RGBAValues
 * @extends RGBValues
 * @property {number} a - Canal alpha pour la transparence (0-1)
 */
export interface RGBAValues extends RGBValues {
  readonly a: number;
}

/**
 * Interface représentant les valeurs HSL d'une couleur
 * @interface HSLValues
 * @property {number} h - Teinte en degrés (0-360)
 * @property {number} s - Saturation en pourcentage (0-100)
 * @property {number} l - Luminosité en pourcentage (0-100)
 */
export interface HSLValues {
  readonly h: number;
  readonly s: number;
  readonly l: number;
}

/**
 * Interface représentant les valeurs HSLA d'une couleur (HSL + transparence)
 * @interface HSLAValues
 * @extends HSLValues
 * @property {number} a - Canal alpha pour la transparence (0-1)
 */
export interface HSLAValues extends HSLValues {
  readonly a: number;
}

/**
 * Options de configuration pour la création d'une instance Color
 * @interface ColorOptions
 * @property {ColorFormat} [format] - Format de couleur souhaité
 * @property {number} [alpha] - Valeur alpha par défaut (0-1)
 * @property {boolean} [validateOnCreate] - Active la validation lors de la création
 */
export interface ColorOptions {
  format?: ColorFormat;
  alpha?: number;
  validateOnCreate?: boolean;
}

/**
 * Résultat d'une opération de validation de couleur
 * @interface ColorValidationResult
 * @property {boolean} isValid - Indique si la couleur est valide
 * @property {string[]} errors - Liste des erreurs de validation
 * @property {string[]} warnings - Liste des avertissements
 */
export interface ColorValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Classe d'erreur spécialisée pour les erreurs du domaine Color
 * @class ColorDomainError
 * @extends Error
 */
export class ColorDomainError extends Error {
  /**
   * Crée une nouvelle instance de ColorDomainError
   * @param {string} message - Message d'erreur descriptif
   * @param {string} code - Code d'erreur unique
   * @param {Record<string, unknown>} [context] - Contexte additionnel pour le débogage
   */
  constructor(
    message: string,
    public readonly code: string,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ColorDomainError';
  }
}