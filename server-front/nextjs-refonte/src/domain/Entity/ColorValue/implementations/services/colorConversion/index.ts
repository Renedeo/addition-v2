// Service principal de conversion
export { ColorConversionService } from './colorConversion.service';
export type { IColorConversionService } from './colorConversion.service';

// Convertisseurs de couleur
export { HexToRGBConverter } from './hexTOrgb.converter';
export { HSLTORGBConverter } from './hslTOrgb.converter';
export { RGBTOHEXConverter } from './rgbTOHex.converter';
export { RGBToHSLConverter } from './rgbTOhsl.converter';

// Constantes de saturation partagées
export { SATURATION_LEVELS, type SaturationInfo as SaturationInfoType } from '@/shared/constants/saturation.constants';