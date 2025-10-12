/**
 * Point d'entrée principal pour tous les services du domaine ColorValue.
 * 
 * Ce fichier exporte tous les services, interfaces et types nécessaires
 * pour utiliser le système de gestion des couleurs dans l'application.
 * 
 * @example
 * ```typescript
 * // Import complet
 * import * as ColorServices from '@/domain/Entity/ColorValue';
 * 
 * // Imports spécifiques
 * import { 
 *   HEXColor, 
 *   ColorConversionService, 
 *   SaturationService 
 * } from '@/domain/Entity/ColorValue';
 * ```
 */

// Entités de couleur principales
export { HEXColor } from './implementations/core/hex';
export { RGBColor } from './implementations/core/rgb';
export { HSLColor } from './implementations/core/hsl';

export { ColorConversionService } from './implementations/services/colorConversion/colorConversion.service';
export { ColorFormatService } from './implementations/shared/services/colorFormat.service';

export { SaturationService } from './implementations/services/colorAnalysis/saturation.service';
export { LightnessService } from './implementations/services/colorAnalysis/lightness.service';

export { EnhanceSaturationService } from './implementations/services/Enhance/enhanceSaturation.service';
export { EnhancedLightnessService } from './implementations/services/Enhance/enhanceLightness.service';

export { ColorContrastService } from './implementations/services/comparison/colorContrast.service';

export { 
  DarkenPaletteService, 
  LightenPaletteService, 
  SaturatePaletteService, 
  DesaturatePaletteService 
} from './implementations/services/Palette/palette.service';

export { ColorConversionFactory } from './implementations/factory/ColorConversion.factory';
export { ConverterRegistry } from './implementations/registry/converter.registry';

// Interfaces et types du core
export * from './core';

/**
 * Guide d'utilisation rapide :
 * 
 * 1. **Créer une couleur** :
 *    ```typescript
 *    const color = new HEXColor('#ff5733');
 *    ```
 * 
 * 2. **Configurer les services** :
 *    ```typescript
 *    const factory = new ColorConversionFactory();
 *    const registry = factory.createDefaultRegistry();
 *    const conversionService = new ColorConversionService(registry);
 *    const formatService = new ColorFormatService(conversionService);
 *    ```
 * 
 * 3. **Analyser une couleur** :
 *    ```typescript
 *    const saturationService = new SaturationService(formatService);
 *    const result = saturationService.analyzeColor(color);
 *    const level = result.saturationLevel; // "high", "balanced", etc.
 *    ```
 * 
 * 4. **Convertir entre formats** :
 *    ```typescript
 *    const rgbColor = conversionService.convert(color, FormatConst.HEX, FormatConst.RGB);
 *    ```
 * 
 * 5. **Calculer le contraste** :
 *    ```typescript
 *    const contrastService = new ColorContrastService(formatService, lightnessService);
 *    const contrast = contrastService.compareColors(foreground, background);
 *    const ratio = contrast.contrastRatio; // 4.2
 *    ```
 */