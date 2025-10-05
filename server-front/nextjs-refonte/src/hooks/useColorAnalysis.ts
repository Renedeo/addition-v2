import { useMemo } from "react";
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import {
  IHEXColor,
  IHSLColor,
  IRGBColor,
} from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ColorServicesHookResult, ColorAnalysisHookResult } from "./types";

/**
 * Hook personnalisé pour gérer l'analyse des couleurs avec validation et gestion d'erreurs.
 * 
 * Ce hook encapsule la logique d'analyse des couleurs et la mémorise pour éviter
 * des recalculs inutiles. Il gère également les erreurs et les valeurs nulles.
 * 
 * @param primaryColor - La couleur principale à analyser
 * @param services - Les services de couleur nécessaires pour l'analyse
 * @returns Objet contenant les résultats de l'analyse ou null en cas d'erreur
 * 
 * @example
 * ```tsx
 * const services = useColorServices();
 * const colorAnalysis = useColorAnalysis(primaryColor, services);
 * 
 * if (colorAnalysis) {
 *   console.log(colorAnalysis.saturationInfo);
 * }
 * ```
 */
export const useColorAnalysis = (primaryColor: IHEXColor, services: ColorServicesHookResult): ColorAnalysisHookResult => {
  // Memoize color analysis to avoid recalculation
  // Les dépendances incluent primaryColor et services car elles influencent directement le calcul.
  const colorAnalysis = useMemo(() => {
    // Vérifications préventives pour éviter les erreurs
    if (!primaryColor) {
      console.warn("useColorAnalysis: primaryColor is null or undefined");
      return null;
    }
    
    if (!services) {
      console.warn("useColorAnalysis: services are null or undefined");
      return null;
    }

    try {
      return {
        saturationInfo: services.saturationService.analyzeColor(primaryColor),
        luminanceInfo: services.lightnessService.analyzeColor(primaryColor),
        rgbValue: services.conversionService.convert(
          primaryColor,
          FormatConst.HEX,
          FormatConst.RGB
        ) as IRGBColor,
        hexValue: services.conversionService.convert(
          primaryColor,
          FormatConst.HEX,
          FormatConst.HEX
        ) as IHEXColor,
        hslValue: services.conversionService.convert(
          primaryColor,
          FormatConst.HEX,
          FormatConst.HSL
        ) as IHSLColor,
      };
    } catch (error) {
      console.error("Error during color analysis:", error);
      return null;
    }
  }, [primaryColor, services]);

  return colorAnalysis;
};