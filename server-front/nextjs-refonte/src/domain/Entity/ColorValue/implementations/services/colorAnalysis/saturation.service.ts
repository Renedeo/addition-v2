import { FormatConst } from "@domain/ColorValue/core/constants/colorRepresentation.const";
import {  HSLColor, IColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IColorSaturationResult, IColorAnalysisService } from "@domain/ColorValue/core/interfaces/service/analysis.interface";
import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";
import { ColorConversionFactory } from "@domain/ColorValue/implementations/factory/ColorConversion.factory";
import { ColorConversionService } from "@domain/ColorValue/implementations/services/colorConversion/colorConversion.service";

/**
 * 0 %	Couleur complètement désaturée → gris neutre
1 % – 30 %	Faible saturation : teintes pastel, douces, proches du gris
31 % – 60 %	Saturation moyenne : couleurs équilibrées, naturelles
61 % – 85 %	Haute saturation : couleurs vives, intenses, dynamiques
86 % – 100 %	Saturation maximale : couleurs pures, très intenses, parfois artificielles
 */
const SaturationInfo = [

    {
        level: "desaturated",
        min: 0,
        max: 0,
        description: "Color completely desaturated, appears as a shade of gray."
    }, 
{
        level: "low",
        min: 0,
        max: 30,
        description: "Low Saturation, pastel shades, close to gray."
    },
    {
        level: "balanced",
        min: 30,
        max: 60,
        description: "Medium Saturation, balanced and natural colors."
    },
    {
        level: "high",
        min: 60,
        max: 85,
        description: "High Saturation, vivid, intense and dynamic colors."
    },
    {
        level: "pure",
        min: 85,
        max: 100,
        description: "Maximum Saturation, pure, very intense colors, sometimes artificial."
    }
]

export class SaturationService implements IColorAnalysisService<IColor, IColorSaturationResult> {
    analyzeColor(color: IColor): IColorSaturationResult {
        // Here preferred format is HSL, so we convert the input color to HSL first
        const hslColor = this.preferredFormat(color) as HSLColor;
        const saturation = hslColor.value.s; // Assuming value has s property for saturation

        const determineSaturationLevel = SaturationInfo.find(info => saturation >= info.min && saturation <= info.max);
        if (!determineSaturationLevel) {
            throw new Error("Saturation level could not be determined for saturation: " + saturation);
        }

        const saturationLevel = determineSaturationLevel.level as "desaturated" | "low" | "balanced" | "high" | "pure";
        const description = determineSaturationLevel.description;

        return { saturationLevel, description, saturation };
    }

    preferredFormat(color: IColor): HSLColor {
        const factory = new ColorConversionFactory();
        const registry = factory.createDefaultRegistry();
        const conversionService = new ColorConversionService(registry);
        return conversionService.convert<IColor, HSLColor>(color, color.format, FormatConst.HSL);
    }

    supportedFormats(): ColorFormat[] {
        return Object.values(FormatConst);
    }
}
