import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IColorFormatter } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { SaturationInfo } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/shared.utils";
import {  IHSLColor, IColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IColorSaturationResult, IColorAnalysisService } from "@domain/ColorValue/core/interfaces/service/analysis.interface";

export class SaturationService implements IColorAnalysisService<IColorSaturationResult> {
    constructor(private colorFormatter: IColorFormatter) {}

    analyzeColor(color: IColor): IColorSaturationResult {
        // Here preferred format is HSL, so we convert the input color to HSL first
        const hslColor = this.colorFormatter.colorFormatter(color, FormatConst.HSL) as IHSLColor;
        const saturation = hslColor.value.s; // Assuming value has s property for saturation

        const determineSaturationLevel = SaturationInfo.find(info => saturation >= info.min && saturation <= info.max);
        if (!determineSaturationLevel) {
            throw new Error("Saturation level could not be determined for saturation: " + saturation);
        }

        const saturationLevel = determineSaturationLevel.level as "desaturated" | "low" | "balanced" | "high" | "pure";
        const description = determineSaturationLevel.description;

        return { saturationLevel, description, saturation };
    }
}
