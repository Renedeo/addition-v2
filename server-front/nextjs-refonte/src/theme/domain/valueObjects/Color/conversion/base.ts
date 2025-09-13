/**
 * 🔄 Color Conversion - Base Converter
 * 
 * Conversions de base entre formats
 * 
 * @module conversion/base
 * @version 1.0.0
 */

import type { ColorConverter, RGBValues, HSLValues } from '../types';

const CONVERSION_CONSTANTS = {
  HEX_RADIX: 16,
  PERCENTAGE_MAX: 100,
  HUE_MAX: 360,
  RGB_MAX: 255,
  HUE_SECTOR: 60
} as const;

export class ColorConverterImpl implements ColorConverter {

  hexToRgb(hex: string): RGBValues {
    let normalizedHex = hex.replace('#', '');
    
    if (normalizedHex.length === 3) {
      normalizedHex = normalizedHex
        .split('')
        .map(char => char + char)
        .join('');
    }

    const r = parseInt(normalizedHex.substring(0, 2), CONVERSION_CONSTANTS.HEX_RADIX);
    const g = parseInt(normalizedHex.substring(2, 4), CONVERSION_CONSTANTS.HEX_RADIX);
    const b = parseInt(normalizedHex.substring(4, 6), CONVERSION_CONSTANTS.HEX_RADIX);

    return { r, g, b };
  }

  rgbToHex(r: number, g: number, b: number): string {
    const toHex = (value: number): string => {
      const hex = Math.round(Math.max(0, Math.min(255, value)))
        .toString(CONVERSION_CONSTANTS.HEX_RADIX)
        .padStart(2, '0');
      return hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  rgbToHsl(r: number, g: number, b: number): HSLValues {
    const rNorm = r / CONVERSION_CONSTANTS.RGB_MAX;
    const gNorm = g / CONVERSION_CONSTANTS.RGB_MAX;
    const bNorm = b / CONVERSION_CONSTANTS.RGB_MAX;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;

    const l = (max + min) / 2;

    let h = 0;
    let s = 0;

    if (delta !== 0) {
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          h = (bNorm - rNorm) / delta + 2;
          break;
        case bNorm:
          h = (rNorm - gNorm) / delta + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * CONVERSION_CONSTANTS.HUE_MAX),
      s: Math.round(s * CONVERSION_CONSTANTS.PERCENTAGE_MAX),
      l: Math.round(l * CONVERSION_CONSTANTS.PERCENTAGE_MAX)
    };
  }

  hslToRgb(h: number, s: number, l: number): RGBValues {
    const hNorm = h / CONVERSION_CONSTANTS.HUE_MAX;
    const sNorm = s / CONVERSION_CONSTANTS.PERCENTAGE_MAX;
    const lNorm = l / CONVERSION_CONSTANTS.PERCENTAGE_MAX;

    if (sNorm === 0) {
      const gray = Math.round(lNorm * CONVERSION_CONSTANTS.RGB_MAX);
      return { r: gray, g: gray, b: gray };
    }

    const hueToRgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = lNorm < 0.5 
      ? lNorm * (1 + sNorm) 
      : lNorm + sNorm - lNorm * sNorm;
    const p = 2 * lNorm - q;

    const r = hueToRgb(p, q, hNorm + 1/3);
    const g = hueToRgb(p, q, hNorm);
    const b = hueToRgb(p, q, hNorm - 1/3);

    return {
      r: Math.round(r * CONVERSION_CONSTANTS.RGB_MAX),
      g: Math.round(g * CONVERSION_CONSTANTS.RGB_MAX),
      b: Math.round(b * CONVERSION_CONSTANTS.RGB_MAX)
    };
  }
}

export const colorConverter = new ColorConverterImpl();