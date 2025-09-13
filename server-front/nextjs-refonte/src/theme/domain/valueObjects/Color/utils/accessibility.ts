/**
 * 🛠️ Color Utils - Accessibility
 * 
 * Utilitaires d'accessibilité conformes WCAG
 * 
 * @module utils/accessibility
 * @version 1.0.0
 */

import type { Color, ColorUtilities } from '../types';

const CONTRAST_RATIOS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3,
  AAA_NORMAL: 7,
  AAA_LARGE: 4.5
} as const;

const LIGHTNESS_THRESHOLD = 0.5;

const LUMINANCE_COEFFICIENTS = {
  RED: 0.2126,
  GREEN: 0.7152,
  BLUE: 0.0722
} as const;

export class ColorUtilitiesImpl implements ColorUtilities {

  getLuminance(color: Color): number {
    const rgb = color.toRgb();
    
    const sRgbToLinear = (value: number): number => {
      const normalized = value / 255;
      return normalized <= 0.03928 
        ? normalized / 12.92 
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    };

    const rLinear = sRgbToLinear(rgb.r);
    const gLinear = sRgbToLinear(rgb.g);
    const bLinear = sRgbToLinear(rgb.b);

    return LUMINANCE_COEFFICIENTS.RED * rLinear + 
           LUMINANCE_COEFFICIENTS.GREEN * gLinear + 
           LUMINANCE_COEFFICIENTS.BLUE * bLinear;
  }

  getContrast(color1: Color, color2: Color): number {
    const luminance1 = this.getLuminance(color1);
    const luminance2 = this.getLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  isLight(color: Color): boolean {
    return this.getLuminance(color) > LIGHTNESS_THRESHOLD;
  }

  isDark(color: Color): boolean {
    return !this.isLight(color);
  }
}

export class AdvancedColorUtilities extends ColorUtilitiesImpl {

  isWcagAACompliant(color1: Color, color2: Color, isLargeText = false): boolean {
    const contrast = this.getContrast(color1, color2);
    const threshold = isLargeText ? CONTRAST_RATIOS.AA_LARGE : CONTRAST_RATIOS.AA_NORMAL;
    return contrast >= threshold;
  }

  isWcagAAACompliant(color1: Color, color2: Color, isLargeText = false): boolean {
    const contrast = this.getContrast(color1, color2);
    const threshold = isLargeText ? CONTRAST_RATIOS.AAA_LARGE : CONTRAST_RATIOS.AAA_NORMAL;
    return contrast >= threshold;
  }

  getOptimalTextColor(backgroundColor: Color, whiteColor: Color, blackColor: Color): Color {
    const whiteContrast = this.getContrast(whiteColor, backgroundColor);
    const blackContrast = this.getContrast(blackColor, backgroundColor);
    
    return whiteContrast > blackContrast ? whiteColor : blackColor;
  }
}

export const colorUtilities = new ColorUtilitiesImpl();
export const advancedColorUtilities = new AdvancedColorUtilities();