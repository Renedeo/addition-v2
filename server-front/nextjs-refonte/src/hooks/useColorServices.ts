import { useMemo } from "react";
import { ColorConversionFactory } from "@/domain/Entity/ColorValue/implementations/factory/ColorConversion.factory";
import { LightnessService } from "@/domain/Entity/ColorValue/implementations/services/colorAnalysis/lightness.service";
import { SaturationService } from "@/domain/Entity/ColorValue/implementations/services/colorAnalysis/saturation.service";
import { ColorConversionService } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/colorConversion.service";
import { ColorFormatService } from "@/domain/Entity/ColorValue/implementations/shared/services/colorFormat.service";
import { EnhanceSaturationService } from "@/domain/Entity/ColorValue/implementations/services/Enhance/enhanceSaturation.service";
import { EnhancedLightnessService } from "@/domain/Entity/ColorValue/implementations/services/Enhance/enhanceLightness.service";
import { ColorContrastService } from "@/domain/Entity/ColorValue/implementations/services/comparison/colorContrast.service";
import { ColorServicesHookResult } from "./types";

/**
 * Hook personnalisé pour gérer la création et la mémorisation des services de couleur.
 * 
 * Ce hook encapsule la logique de création des services et les mémorise pour éviter
 * des recréations inutiles à chaque rendu du composant.
 * 
 * @returns Objet contenant tous les services de couleur nécessaires
 * 
 * @example
 * ```tsx
 * const services = useColorServices();
 * const result = services.saturationService.analyzeColor(color);
 * ```
 */
export const useColorServices = (): ColorServicesHookResult => {
  // Mémoriser la factory et le registry pour éviter les recréations
  const factory = useMemo(() => new ColorConversionFactory(), []);
  const registry = useMemo(() => factory.createDefaultRegistry(), [factory]);

  // Mémoriser le service de conversion principal
  const conversionService = useMemo(() => new ColorConversionService(registry), [registry]);

  // Mémoriser le formateur de couleur
  const colorFormatter = useMemo(() => new ColorFormatService(conversionService), [conversionService]);

  // Mémoriser les services d'analyse
  const lightnessService = useMemo(() => new LightnessService(colorFormatter), [colorFormatter]);
  const saturationService = useMemo(() => new SaturationService(colorFormatter), [colorFormatter]);

  // Mémoriser les services d'amélioration
  const enhanceSaturationService = useMemo(() => new EnhanceSaturationService(colorFormatter), [colorFormatter]);
  const enhanceLightnessService = useMemo(() => new EnhancedLightnessService(colorFormatter), [colorFormatter]);

  // Mémoriser le service de contraste
  const contrastService = useMemo(() => new ColorContrastService(colorFormatter, lightnessService), [colorFormatter, lightnessService]);

  // Mémoriser l'objet final des services
  const services = useMemo(() => {
    try {
      return {
        conversionService,
        saturationService,
        lightnessService,
        enhanceSaturationService,
        enhanceLightnessService,
        contrastService,
        colorFormatter,
      };
    } catch (error) {
      console.error("Error initializing color services:", error);
      return null;
    }
  }, [
    conversionService,
    saturationService,
    lightnessService,
    enhanceSaturationService,
    enhanceLightnessService,
    contrastService,
    colorFormatter
  ]);

  return services;
};