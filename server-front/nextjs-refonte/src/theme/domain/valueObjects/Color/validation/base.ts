/**
 * 🔍 Color Validation - Base Validator
 * 
 * Validation de base pour les couleurs
 * 
 * @module validation/base
 * @version 1.0.0
 */

import type { ColorValidator } from '../types';

// Constantes de validation
const HEX_REGEX = /^#?([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

const RANGES = {
  RGB: { min: 0, max: 255 },
  HSL_HUE: { min: 0, max: 360 },
  HSL_SATURATION: { min: 0, max: 100 },
  HSL_LIGHTNESS: { min: 0, max: 100 },
  ALPHA: { min: 0, max: 1 }
} as const;

/** Implémentation concrète du validateur de couleurs */
export class ColorValidatorImpl implements ColorValidator {
  
  validateHex(hex: string): boolean {
    if (typeof hex !== 'string') return false;
    return HEX_REGEX.test(hex);
  }

  validateRGB(r: number, g: number, b: number): boolean {
    return this.isInRange(r, RANGES.RGB) &&
           this.isInRange(g, RANGES.RGB) &&
           this.isInRange(b, RANGES.RGB);
  }

  validateHSL(h: number, s: number, l: number): boolean {
    return this.isInRange(h, RANGES.HSL_HUE) &&
           this.isInRange(s, RANGES.HSL_SATURATION) &&
           this.isInRange(l, RANGES.HSL_LIGHTNESS);
  }

  validateAlpha(alpha: number): boolean {
    return this.isInRange(alpha, RANGES.ALPHA);
  }

  private isInRange(value: number, range: { min: number; max: number }): boolean {
    return typeof value === 'number' && 
           !isNaN(value) && 
           value >= range.min && 
           value <= range.max;
  }
}

/** Instance singleton du validateur */
export const colorValidator = new ColorValidatorImpl();