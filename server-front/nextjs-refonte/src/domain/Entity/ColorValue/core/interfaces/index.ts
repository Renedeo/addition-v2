// Barrel file for ColorValue core interfaces

// Interfaces de couleur
export type { IColor, IRGBColor, IHSLColor, IHEXColor } from './color/color.interface';

// Interfaces de factory
export type { IColorConversionFactory } from './factory/factory.interface';

// Interfaces de registre
export type { IConverterRegistry } from './registry/registry.interface';

// Interfaces d'analyse
export type {
  IColorAnalysisService,
  IColorComparisonService,
  IColorSaturationResult,
  IColorLightnessResult,
  IColorContrastResult
} from './service/analysis.interface';

// Interfaces de conversion
export type {
  IConverter,
  IDirectConversionService,
  IIntermediateColorConversionService,
  IConversionCapabilityService
} from './service/converter.interface';

// Interfaces d'amélioration
export type { IEnhancedColorService } from './service/enhanced.interface';

// Interfaces de palette
export type { IColorPalette } from './service/palette.interface';

// Interfaces partagées
export type { IColorFormatHandler } from './service/shared.interface';
