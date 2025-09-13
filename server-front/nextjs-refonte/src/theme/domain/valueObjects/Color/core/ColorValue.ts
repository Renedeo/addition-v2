/**
 * 🎨 Color Core - Value Object Implementation
 * 
 * Implémentation principale du Value Object Color
 * 
 * @module core/ColorValue
 * @version 1.0.0
 */

import type { 
  Color, 
  ColorFormat, 
  ColorOptions, 
  RGBValues, 
  RGBAValues, 
  HSLValues, 
  HSLAValues 
} from '../types';
import { ColorDomainError } from '../types';
import { colorValidator, assertValidColor } from '../validation';
import { colorConverter, advancedColorConverter } from '../conversion';
import { colorUtilities } from '../utils';

export class ColorValue implements Color {
  private readonly _value: string;
  private readonly _format: ColorFormat;
  private readonly _hasAlpha: boolean;

  // Cache pour optimiser les performances
  private _rgbCache?: RGBValues;
  private _hslCache?: HSLValues;
  private _luminanceCache?: number;

  constructor(value: string, options: ColorOptions = {}) {
    this.validateInput(value, options);

    const detectedFormat = options.format || this.detectFormat(value);
    assertValidColor(value, detectedFormat);

    this._value = this.normalizeValue(value, detectedFormat);
    this._format = detectedFormat;
    this._hasAlpha = this.detectAlpha(this._value, detectedFormat);

    if (options.validateOnCreate !== false) {
      this.validateColorValue();
    }

    Object.freeze(this);
  }

  get value(): string { return this._value; }
  get format(): ColorFormat { return this._format; }
  get hasAlpha(): boolean { return this._hasAlpha; }

  toHex(): string {
    if (this._format === 'hex') return this._value;
    const rgb = this.toRgb();
    return colorConverter.rgbToHex(rgb.r, rgb.g, rgb.b);
  }

  toRgb(): RGBValues {
    if (this._rgbCache) return this._rgbCache;

    let rgb: RGBValues;
    switch (this._format) {
      case 'hex':
        rgb = colorConverter.hexToRgb(this._value);
        break;
      case 'rgb':
      case 'rgba':
        rgb = this.parseRgbString(this._value);
        break;
      case 'hsl':
      case 'hsla':
        const hsl = this.parseHslString(this._value);
        rgb = colorConverter.hslToRgb(hsl.h, hsl.s, hsl.l);
        break;
      default:
        throw new ColorDomainError(`Format non supporté: ${this._format}`, 'UNSUPPORTED_FORMAT');
    }

    this._rgbCache = rgb;
    return rgb;
  }

  toRgba(): RGBAValues {
    const rgb = this.toRgb();
    return { ...rgb, a: this.getAlphaValue() };
  }

  toHsl(): HSLValues {
    if (this._hslCache) return this._hslCache;

    let hsl: HSLValues;
    switch (this._format) {
      case 'hsl':
      case 'hsla':
        hsl = this.parseHslString(this._value);
        break;
      default:
        const rgb = this.toRgb();
        hsl = colorConverter.rgbToHsl(rgb.r, rgb.g, rgb.b);
        break;
    }

    this._hslCache = hsl;
    return hsl;
  }

  toHsla(): HSLAValues {
    const hsl = this.toHsl();
    return { ...hsl, a: this.getAlphaValue() };
  }

  toString(format?: ColorFormat): string {
    const targetFormat = format || this._format;
    switch (targetFormat) {
      case 'hex': return this.toHex();
      case 'rgb':
        const rgb = this.toRgb();
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case 'rgba':
        const rgba = this.toRgba();
        return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
      case 'hsl':
        const hsl = this.toHsl();
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      case 'hsla':
        const hsla = this.toHsla();
        return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
      default: return this._value;
    }
  }

  getLuminance(): number {
    if (this._luminanceCache !== undefined) return this._luminanceCache;
    this._luminanceCache = colorUtilities.getLuminance(this);
    return this._luminanceCache;
  }

  getContrast(other: Color): number {
    return colorUtilities.getContrast(this, other);
  }

  isLight(): boolean { return colorUtilities.isLight(this); }
  isDark(): boolean { return colorUtilities.isDark(this); }

  withAlpha(alpha: number): Color {
    if (!colorValidator.validateAlpha(alpha)) {
      throw new ColorDomainError(`Valeur alpha invalide: ${alpha}`, 'INVALID_ALPHA');
    }

    if (this._format === 'hex') {
      const hexWithAlpha = advancedColorConverter.addAlphaToHex(this._value, alpha);
      return new ColorValue(hexWithAlpha, { format: 'hex' });
    }

    const rgba = this.toRgba();
    return new ColorValue(`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`, { format: 'rgba' });
  }

  lighten(amount: number): Color {
    const hsl = this.toHsl();
    const newLightness = Math.min(100, Math.max(0, hsl.l + amount * 100));
    const newRgb = colorConverter.hslToRgb(hsl.h, hsl.s, newLightness);
    const newHex = colorConverter.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    return new ColorValue(newHex, { format: 'hex' });
  }

  darken(amount: number): Color { return this.lighten(-amount); }

  saturate(amount: number): Color {
    const hsl = this.toHsl();
    const newSaturation = Math.min(100, Math.max(0, hsl.s + amount * 100));
    const newRgb = colorConverter.hslToRgb(hsl.h, newSaturation, hsl.l);
    const newHex = colorConverter.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    return new ColorValue(newHex, { format: 'hex' });
  }

  desaturate(amount: number): Color { return this.saturate(-amount); }

  equals(other: Color): boolean {
    if (!(other instanceof ColorValue)) return false;
    const thisRgb = this.toRgb();
    const otherRgb = other.toRgb();
    return thisRgb.r === otherRgb.r && thisRgb.g === otherRgb.g && thisRgb.b === otherRgb.b &&
           this.getAlphaValue() === other.getAlphaValue();
  }

  isValid(): boolean {
    try {
      this.validateColorValue();
      return true;
    } catch { return false; }
  }

  // Méthodes privées helper (raccourcies pour respecter la limite de lignes)
  private validateInput(value: string, options: ColorOptions): void {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new ColorDomainError('Valeur invalide', 'INVALID_INPUT');
    }
  }

  private detectFormat(value: string): ColorFormat {
    const trimmed = value.trim();
    if (trimmed.startsWith('#')) return 'hex';
    if (trimmed.startsWith('rgba(')) return 'rgba';
    if (trimmed.startsWith('rgb(')) return 'rgb';
    if (trimmed.startsWith('hsla(')) return 'hsla';
    if (trimmed.startsWith('hsl(')) return 'hsl';
    if (/^[0-9A-Fa-f]{3,8}$/.test(trimmed)) return 'hex';
    throw new ColorDomainError(`Format non détectable: ${value}`, 'UNKNOWN_FORMAT');
  }

  private normalizeValue(value: string, format: ColorFormat): string {
    return format === 'hex' ? advancedColorConverter.normalizeHex(value.trim()) : value.trim();
  }

  private detectAlpha(value: string, format: ColorFormat): boolean {
    switch (format) {
      case 'rgba': case 'hsla': return true;
      case 'hex': return value.replace('#', '').length === 8;
      default: return false;
    }
  }

  private getAlphaValue(): number {
    if (!this._hasAlpha) return 1;
    switch (this._format) {
      case 'hex': return advancedColorConverter.extractAlphaFromHex(this._value);
      case 'rgba':
        const rgbaMatch = this._value.match(/rgba\([\d\s,]+,\s*([\d.]+)\)/);
        return rgbaMatch ? parseFloat(rgbaMatch[1]) : 1;
      case 'hsla':
        const hslaMatch = this._value.match(/hsla\([\d\s,%]+,\s*([\d.]+)\)/);
        return hslaMatch ? parseFloat(hslaMatch[1]) : 1;
      default: return 1;
    }
  }

  private parseRgbString(rgbString: string): RGBValues {
    const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) throw new ColorDomainError(`Format RGB invalide: ${rgbString}`, 'INVALID_RGB_FORMAT');
    return { r: parseInt(match[1], 10), g: parseInt(match[2], 10), b: parseInt(match[3], 10) };
  }

  private parseHslString(hslString: string): HSLValues {
    const match = hslString.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);
    if (!match) throw new ColorDomainError(`Format HSL invalide: ${hslString}`, 'INVALID_HSL_FORMAT');
    return { h: parseInt(match[1], 10), s: parseInt(match[2], 10), l: parseInt(match[3], 10) };
  }

  private validateColorValue(): void {
    if (this._format === 'hex' && !colorValidator.validateHex(this._value)) {
      throw new ColorDomainError(`Couleur hexadécimale invalide: ${this._value}`, 'INVALID_HEX');
    }
  }
}