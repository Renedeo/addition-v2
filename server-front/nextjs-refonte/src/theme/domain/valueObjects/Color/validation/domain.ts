/**
 * 🧪 Color Validation - Domain Validator
 * 
 * Validation métier avancée avec règles de domaine
 * 
 * @module validation/domain
 * @version 1.0.0
 */

import type { ColorValidationResult, ColorDomainValidator } from '../types';
import { ColorDomainError } from '../types';
import { colorValidator } from './base';

/**
 * Validateur métier pour les couleurs avec règles de domaine
 */
export class ColorDomainValidatorImpl implements ColorDomainValidator {

  validateColorValue(colorValue: string, format: string): ColorValidationResult {
    const result: ColorValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    try {
      switch (format) {
        case 'hex':
          this.validateHexColor(colorValue, result);
          break;
        case 'rgb':
        case 'rgba':
          this.validateRgbColor(colorValue, result);
          break;
        case 'hsl':
        case 'hsla':
          this.validateHslColor(colorValue, result);
          break;
        default:
          result.errors.push(`Format de couleur non supporté: ${format}`);
      }

      this.addAccessibilityWarnings(colorValue, result);

    } catch (error) {
      result.errors.push(`Erreur de validation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }

    result.isValid = result.errors.length === 0;
    return result;
  }

  private validateHexColor(hex: string, result: ColorValidationResult): void {
    if (!colorValidator.validateHex(hex)) {
      result.errors.push(`Couleur hexadécimale invalide: ${hex}`);
      return;
    }

    const normalizedHex = hex.replace('#', '');
    if (normalizedHex.length === 3) {
      result.warnings.push('Format court détecté, sera étendu automatiquement');
    }
  }

  private validateRgbColor(rgb: string, result: ColorValidationResult): void {
    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) {
      result.errors.push(`Format RGB invalide: ${rgb}`);
      return;
    }

    const [, r, g, b, a] = match;
    if (!colorValidator.validateRGB(Number(r), Number(g), Number(b))) {
      result.errors.push(`Valeurs RGB hors limites: ${r}, ${g}, ${b}`);
    }

    if (a !== undefined && !colorValidator.validateAlpha(Number(a))) {
      result.errors.push(`Valeur alpha invalide: ${a}`);
    }
  }

  private validateHslColor(hsl: string, result: ColorValidationResult): void {
    const match = hsl.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
    if (!match) {
      result.errors.push(`Format HSL invalide: ${hsl}`);
      return;
    }

    const [, h, s, l, a] = match;
    if (!colorValidator.validateHSL(Number(h), Number(s), Number(l))) {
      result.errors.push(`Valeurs HSL hors limites: ${h}, ${s}%, ${l}%`);
    }

    if (a !== undefined && !colorValidator.validateAlpha(Number(a))) {
      result.errors.push(`Valeur alpha invalide: ${a}`);
    }
  }

  private addAccessibilityWarnings(colorValue: string, result: ColorValidationResult): void {
    if (colorValue.toLowerCase() === '#ffffff') {
      result.warnings.push('Couleur très claire - vérifier le contraste');
    }
    if (colorValue.toLowerCase() === '#000000') {
      result.warnings.push('Couleur très sombre - vérifier le contraste');
    }
  }
}

export const colorDomainValidator = new ColorDomainValidatorImpl();

export function isValidColor(value: string, format: string): boolean {
  return colorDomainValidator.validateColorValue(value, format).isValid;
}

export function assertValidColor(value: string, format: string): void {
  const result = colorDomainValidator.validateColorValue(value, format);
  if (!result.isValid) {
    throw new ColorDomainError(
      `Couleur invalide: ${result.errors.join(', ')}`,
      'INVALID_COLOR',
      { value, format, errors: result.errors }
    );
  }
}