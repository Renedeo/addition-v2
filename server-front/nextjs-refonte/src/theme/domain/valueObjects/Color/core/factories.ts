/**
 * 🚀 Color Core - Factory Functions
 * 
 * Fonctions de création pour Color
 * 
 * @module core/factories
 * @version 1.0.0
 */

import type { Color, ColorOptions } from '../types';
import { ColorValue } from './ColorValue';

export function createColor(value: string, options?: ColorOptions): Color {
  return new ColorValue(value, options);
}

export function createColorFromHex(hex: string): Color {
  return new ColorValue(hex, { format: 'hex' });
}

export function createColorFromRgb(r: number, g: number, b: number, a?: number): Color {
  const rgbString = a !== undefined 
    ? `rgba(${r}, ${g}, ${b}, ${a})`
    : `rgb(${r}, ${g}, ${b})`;
  
  return new ColorValue(rgbString, { format: a !== undefined ? 'rgba' : 'rgb' });
}

export function createColorFromHsl(h: number, s: number, l: number, a?: number): Color {
  const hslString = a !== undefined
    ? `hsla(${h}, ${s}%, ${l}%, ${a})`
    : `hsl(${h}, ${s}%, ${l}%)`;
  
  return new ColorValue(hslString, { format: a !== undefined ? 'hsla' : 'hsl' });
}