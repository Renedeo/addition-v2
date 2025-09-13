/**
 * 🚀 Color Conversion - Utilities
 * 
 * Fonctions utilitaires de conversion
 * 
 * @module conversion/utils
 * @version 1.0.0
 */

import type { RGBValues, HSLValues } from '../types';
import { colorConverter } from './base';

export function hexToRgb(hex: string): RGBValues {
  return colorConverter.hexToRgb(hex);
}

export function rgbToHex(r: number, g: number, b: number): string {
  return colorConverter.rgbToHex(r, g, b);
}

export function rgbToHsl(r: number, g: number, b: number): HSLValues {
  return colorConverter.rgbToHsl(r, g, b);
}

export function hslToRgb(h: number, s: number, l: number): RGBValues {
  return colorConverter.hslToRgb(h, s, l);
}