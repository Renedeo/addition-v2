/**
 * 🚀 Color Utils - Helper Functions
 * 
 * Fonctions utilitaires rapides
 * 
 * @module utils/helpers
 * @version 1.0.0
 */

import type { Color } from '../types';
import { colorUtilities, advancedColorUtilities } from './accessibility';

export function getLuminance(color: Color): number {
  return colorUtilities.getLuminance(color);
}

export function getContrast(color1: Color, color2: Color): number {
  return colorUtilities.getContrast(color1, color2);
}

export function isLight(color: Color): boolean {
  return colorUtilities.isLight(color);
}

export function isDark(color: Color): boolean {
  return colorUtilities.isDark(color);
}

export function isWcagAACompliant(
  foreground: Color, 
  background: Color, 
  isLargeText = false
): boolean {
  return advancedColorUtilities.isWcagAACompliant(foreground, background, isLargeText);
}

export function isWcagAAACompliant(
  foreground: Color, 
  background: Color, 
  isLargeText = false
): boolean {
  return advancedColorUtilities.isWcagAAACompliant(foreground, background, isLargeText);
}