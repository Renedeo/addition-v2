import { useMemo, useRef } from "react";
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import {
  IHEXColor,
  IHSLColor,
  IRGBColor,
} from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { useDebouncedValue } from "@/shared/hooks/common.hooks";
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
  // Débounce la couleur pour éviter les recalculs excessifs
  const [, debouncedPrimaryColor] = useDebouncedValue(primaryColor, 150);
  
  // Cache pour éviter les recalculs inutiles même avec la même couleur
  const analysisCache = useRef<Map<string, ColorAnalysisHookResult>>(new Map());

  // Memoize color analysis to avoid recalculation
  const colorAnalysis = useMemo(() => {
    // Vérifications préventives pour éviter les erreurs
    if (!debouncedPrimaryColor) {
      console.warn("useColorAnalysis: primaryColor is null or undefined");
      return null;
    }
    
    if (!services) {
      console.warn("useColorAnalysis: services are null or undefined");
      return null;
    }

    // Clé de cache basée sur la couleur
    const cacheKey = debouncedPrimaryColor.stringValue();
    
    // Vérifier le cache
    if (analysisCache.current.has(cacheKey)) {
      return analysisCache.current.get(cacheKey)!;
    }

    try {
      const result = {
        saturationInfo: services.saturationService.analyzeColor(debouncedPrimaryColor),
        luminanceInfo: services.lightnessService.analyzeColor(debouncedPrimaryColor),
        rgbValue: services.conversionService.convert(
          debouncedPrimaryColor,
          FormatConst.HEX,
          FormatConst.RGB
        ) as IRGBColor,
        hexValue: services.conversionService.convert(
          debouncedPrimaryColor,
          FormatConst.HEX,
          FormatConst.HEX
        ) as IHEXColor,
        hslValue: services.conversionService.convert(
          debouncedPrimaryColor,
          FormatConst.HEX,
          FormatConst.HSL
        ) as IHSLColor,
      };

      // Mettre en cache le résultat
      analysisCache.current.set(cacheKey, result);
      
      // Limiter la taille du cache (garder seulement les 10 derniers)
      if (analysisCache.current.size > 10) {
        const firstKey = analysisCache.current.keys().next().value;
        if (firstKey) {
          analysisCache.current.delete(firstKey);
        }
      }

      return result;
    } catch (error) {
      console.error("Error during color analysis:", error);
      return null;
    }
  }, [debouncedPrimaryColor, services]);

  return colorAnalysis;
};