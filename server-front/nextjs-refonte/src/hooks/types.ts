import { 
  IColorAnalysisService, 
  IColorComparisonService, 
  IColorContrastResult, 
  IColorSaturationResult, 
  IColorLightnessResult 
} from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";
import { IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";
import { IDirectConversionService } from "@/domain/Entity/ColorValue/core/interfaces/service/converter.interface";
import { IColor, IHEXColor, IRGBColor, IHSLColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";

/**
 * Interface pour les services de couleur utilisés dans l'application
 */
export interface IColorServices {
  conversionService: IDirectConversionService;
  saturationService: IColorAnalysisService<IColorSaturationResult>;
  lightnessService: IColorAnalysisService<IColorLightnessResult>;
  enhanceSaturationService: IEnhancedColorService;
  enhanceLightnessService: IEnhancedColorService;
  contrastService: IColorComparisonService<IColor, IColor, IColorContrastResult>;
  colorFormatter: IColorFormatHandler;
}

/**
 * Interface pour les résultats d'analyse de couleur
 */
export interface IColorAnalysisResult {
  saturationInfo: IColorSaturationResult;
  luminanceInfo: IColorLightnessResult;
  rgbValue: IRGBColor;
  hexValue: IHEXColor;
  hslValue: IHSLColor;
}

/**
 * Type pour les hooks de services de couleur
 */
export type ColorServicesHookResult = IColorServices | null;

/**
 * Type pour les hooks d'analyse de couleur
 */
export type ColorAnalysisHookResult = IColorAnalysisResult | null;