import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IColor, RGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorAnalysisService, IColorLightnessResult, } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";
import { ColorConversionFactory } from "@/domain/Entity/ColorValue/implementations/factory/ColorConversion.factory";
import { ColorConversionService } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/colorConversion.service";

export class lightnessService implements IColorAnalysisService<IColor, IColorLightnessResult> {
    analyzeColor(color: IColor): IColorLightnessResult {
        // Here preferred format is RGB, so we convert the input color to RGB first
        const rgbColor = this.preferredFormat(color) as RGBColor;
        // Calculate relative luminance (Y) using the Rec. 709 formula
        // Y = 0.2126*R + 0.7152*G + 0.0722*B
        // where R, G, B are in the range [0, 1]
        // Constants are based on human perception of color brightness
        const rNorm = rgbColor.value.r / 255;
        const gNorm = rgbColor.value.g / 255;
        const bNorm = rgbColor.value.b / 255;
        const lightness = 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;

        return {
            lightnessLevel: lightness < 0.5 ? "Dark" : "Light",
            description: lightness < 0.5 ? "The color is perceived as dark." : "The color is perceived as light.",
            lightness: lightness,
        };
    }

    preferredFormat(color: IColor): RGBColor {
        const factory = new ColorConversionFactory();
        const registry = factory.createDefaultRegistry();
        const conversionService = new ColorConversionService(registry);
        return conversionService.convert<IColor, RGBColor>(color, color.format, FormatConst.RGB);
    }
    supportedFormats(): ColorFormat[] {
        return Object.values(FormatConst);
    }
}