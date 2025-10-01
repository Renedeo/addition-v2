import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IColor, IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorAnalysisService, IColorLightnessResult, } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";
import { IColorFormatter } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";

export class LightnessService implements IColorAnalysisService<IColorLightnessResult> {
    constructor(private colorFormatter: IColorFormatter) {}

    analyzeColor(color: IColor): IColorLightnessResult {
        // Here preferred format is RGB, so we convert the input color to RGB first
        const rgbColor = this.colorFormatter.colorFormatter(color, FormatConst.RGB) as IRGBColor;
        // Calculate relative luminance (Y) using the Rec. 709 formula
        // Y = 0.2126*R + 0.7152*G + 0.0722*B
        // where R, G, B are in the range [0, 1]
        // Constants are based on human perception of color brightness
        const rNorm = rgbColor.value.r / 255;
        const gNorm = rgbColor.value.g / 255;
        const bNorm = rgbColor.value.b / 255;

        // Apply gamma correction
        const coeff = (value: number) => {
            return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        }
        const r = coeff(rNorm);
        const g = coeff(gNorm);
        const b = coeff(bNorm);

        const lightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return {
            lightnessLevel: lightness < 0.5 ? "Dark" : "Light",
            description: lightness < 0.5 ? "The color is perceived as dark." : "The color is perceived as light.",
            lightness: lightness,
        };
    }
}