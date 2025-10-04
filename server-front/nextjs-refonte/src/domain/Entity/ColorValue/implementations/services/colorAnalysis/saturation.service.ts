

import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { SaturationInfo } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/shared.utils";
import {  IHSLColor, IColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IColorSaturationResult, IColorAnalysisService } from "@domain/ColorValue/core/interfaces/service/analysis.interface";

/**
 * Service d'analyse de la saturation d'une couleur.
 * Utilise le format HSL et une table de niveaux pour déterminer le niveau et la description.
 *
 * Exemple d'utilisation :
 * ```typescript
 * const service = new SaturationService(formatHandler);
 * const result = service.analyzeColor(color);
 * console.log(result.saturationLevel); // "balanced", "high", etc.
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

        // Détermination du niveau de saturation via la table SaturationInfo
        const determineSaturationLevel = SaturationInfo.find(info => saturation >= info.min && saturation <= info.max);
        if (!determineSaturationLevel) {
            throw new Error("Saturation level could not be determined for saturation: " + saturation);
        }

        const saturationLevel = determineSaturationLevel.level as "desaturated" | "low" | "balanced" | "high" | "pure";
        const description = determineSaturationLevel.description;

        return { saturationLevel, description, saturation };
    }
}
