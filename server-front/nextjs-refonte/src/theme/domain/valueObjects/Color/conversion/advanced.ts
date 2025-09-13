/**
 * 🧮 Color Conversion - Advanced Converter
 * 
 * Conversions avancées et utilitaires
 * 
 * @module conversion/advanced
 * @version 1.0.0
 */

import type { HSLValues } from '../types';
import { ColorConverterImpl } from './base';

const CONVERSION_CONSTANTS = {
  HEX_RADIX: 16,
  RGB_MAX: 255
} as const;

export class AdvancedColorConverter extends ColorConverterImpl {

  hexToHsl(hex: string): HSLValues {
    const rgb = this.hexToRgb(hex);
    return this.rgbToHsl(rgb.r, rgb.g, rgb.b);
  }

  hslToHex(h: number, s: number, l: number): string {
    const rgb = this.hslToRgb(h, s, l);
    return this.rgbToHex(rgb.r, rgb.g, rgb.b);
  }

  normalizeHex(hex: string): string {
    const rgb = this.hexToRgb(hex);
    return this.rgbToHex(rgb.r, rgb.g, rgb.b);
  }

  extractAlphaFromHex(hex: string): number {
    const normalizedHex = hex.replace('#', '');
    if (normalizedHex.length === 8) {
      const alphaHex = normalizedHex.substring(6, 8);
      return parseInt(alphaHex, CONVERSION_CONSTANTS.HEX_RADIX) / CONVERSION_CONSTANTS.RGB_MAX;
    }
    return 1;
  }

  addAlphaToHex(hex: string, alpha: number): string {
    const normalizedHex = this.normalizeHex(hex);
    const alphaValue = Math.round(Math.max(0, Math.min(1, alpha)) * CONVERSION_CONSTANTS.RGB_MAX);
    const alphaHex = alphaValue.toString(CONVERSION_CONSTANTS.HEX_RADIX).padStart(2, '0');
    return `${normalizedHex}${alphaHex}`;
  }
}

export const advancedColorConverter = new AdvancedColorConverter();