

import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { SATURATION_LEVELS } from "@/shared/constants/saturation.constants";
import {  IHSLColor, IColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IColorSaturationResult, IColorAnalysisService } from "@domain/ColorValue/core/interfaces/service/analysis.interface";

/**
 * Service d'analyse de la saturation d'une couleur.
 * Utilise le format HSL et une table de niveaux pour déterminer le niveau et la description.
 *
 * Exemple d'utilisation :
 * ```typescript
 * import { ColorFormatService } from '@/shared/services/colorFormat.service';
 * import { ColorConversionService } from './colorConversion/colorConversion.service';
 * 
 * const conversionService = new ColorConversionService(registry);
 * const formatService = new ColorFormatService(conversionService);
 * const service = new SaturationService(formatService);
 * const result = service.analyzeColor(color);
 * const level = result.saturationLevel; // "balanced", "high", etc.
 * ```
 */
export class SaturationService implements IColorAnalysisService<IColorSaturationResult> {
    constructor(private colorFormatter: IColorFormatHandler) {}

    /**
     * Analyse la saturation d'une couleur selon des seuils prédéfinis.
     * @param color Couleur à analyser
     * @returns Résultat contenant le niveau, la description et la valeur de saturation
     */
    analyzeColor(color: IColor): IColorSaturationResult {
        // Conversion en HSL
        const hslColor = this.colorFormatter.formatColor(color, FormatConst.HSL) as IHSLColor;
        const saturation = hslColor.value.s; // Valeur de saturation

        // Détermination du niveau de saturation via la table SATURATION_LEVELS
        const determineSaturationLevel = SATURATION_LEVELS.find(info => saturation >= info.min && saturation <= info.max);
        if (!determineSaturationLevel) {
            throw new Error("Saturation level could not be determined for saturation: " + saturation);
        }

        const saturationLevel = determineSaturationLevel.level as "desaturated" | "low" | "balanced" | "high" | "pure";
        const description = determineSaturationLevel.description;

        return { saturationLevel, description, saturation };
    }
}
