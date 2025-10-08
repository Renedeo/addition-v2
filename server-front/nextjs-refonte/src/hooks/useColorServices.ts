import { useMemo } from "react";
import { IConverterRegistry } from "@/domain/Entity/ColorValue/core/interfaces/registry/registry.interface";
import { ColorConversionFactory } from "@/domain/Entity/ColorValue/implementations/factory/ColorConversion.factory";
import { LightnessService } from "@/domain/Entity/ColorValue/implementations/services/colorAnalysis/lightness.service";
import { SaturationService } from "@/domain/Entity/ColorValue/implementations/services/colorAnalysis/saturation.service";
import { ColorConversionService } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/colorConversion.service";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
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
  // Memoize services to avoid recreating on each render
  // Le tableau de dépendances est vide car les services ne dépendent pas d'éléments dynamiques.
  const services = useMemo(() => {
    try {
      const factory = new ColorConversionFactory();
      const registry: IConverterRegistry = factory.createDefaultRegistry();
      const conversionService = new ColorConversionService(registry);
      const colorFormatter: IColorFormatHandler = new ColorFormatService(
        conversionService
      );
      const lightnessService = new LightnessService(colorFormatter);
      const saturationService = new SaturationService(colorFormatter);
      const enhanceSaturationService = new EnhanceSaturationService(
        colorFormatter
      );
      const enhanceLightnessService = new EnhancedLightnessService(
        colorFormatter
      );
      const contrastService = new ColorContrastService(
        colorFormatter,
        lightnessService
      );

      return {
        conversionService,
        saturationService,
        lightnessService,
        enhanceSaturationService,
        enhanceLightnessService,
        contrastService,
      };
    } catch (error) {
      console.error("Error initializing color services:", error);
      return null;
    }
  }, []);

  return services;
};