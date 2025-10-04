// Service principal de conversion
export { ColorConversionService } from './colorConversion.service';
export type { IColorConversionService } from './colorConversion.service';

// Convertisseurs de couleur
export { HexToRGBConverter } from './hexTOrgb.converter';
export { HSLTORGBConverter } from './hslTOrgb.converter';
export { RGBTOHEXConverter } from './rgbTOHex.converter';
export { RGBToHSLConverter } from './rgbTOhsl.converter';

// Utilitaires partagés
export { SaturationInfo } from './shared.utils';