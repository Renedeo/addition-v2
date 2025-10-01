import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IColor, IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorAnalysisService, IColorComparisonService, IColorContrastResult, IColorLightnessResult } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";
import { IColorFormatter } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";

export class ColorContrastService implements IColorComparisonService<IColor, IColor, IColorContrastResult> {
    constructor(private colorFormatter: IColorFormatter, private lightnessService: IColorAnalysisService<IColorLightnessResult>) {}

    compareColors(color1: IColor, color2: IColor): IColorContrastResult {

        const rgbColor1 = this.colorFormatter.colorFormatter(color1, FormatConst.RGB) as IRGBColor;
        const rgbColor2 = this.colorFormatter.colorFormatter(color2, FormatConst.RGB) as IRGBColor;

        // Placeholder implementation
        const contrastRatio = this.calculateContrastRatio(rgbColor1, rgbColor2);

        // For Normal text, WCAG AA requires a contrast ratio of at least 4.5:1, and AAA requires 7:1
        const isAccessible = contrastRatio >= 4.5;
        const normalTextLevel = contrastRatio >= 7 ? "AAA" : contrastRatio >= 4.5 ? "AA" : "Fail";

        // For Large text (18pt and larger, or 14pt bold and larger), WCAG AA requires a contrast ratio of at least 3:1, and AAA requires 4.5:1
        const isLargeTextAccessible = contrastRatio >= 3;
        const largeTextLevel = contrastRatio >= 4.5 ? "AAA" : contrastRatio >= 3 ? "AA" : "Fail";

        return {
            contrastRatio,
            isAccessible: {
                normalText: isAccessible,
                largeText: isLargeTextAccessible
            },
            level: {
                normalText: normalTextLevel,
                largeText: largeTextLevel
            },
            description: "Not implemented"
        };
    }

    private calculateContrastRatio(foregroundColor: IRGBColor, backgroundColor: IRGBColor): number {
        const luminance1 = this.lightnessService.analyzeColor(foregroundColor).lightness + 0.05;
        const luminance2 = this.lightnessService.analyzeColor(backgroundColor).lightness + 0.05;

        return luminance1 > luminance2
            ? luminance1 / luminance2
            : luminance2 / luminance1;
    }

    supportedFormats(): ColorFormat[] {
        return Object.values(FormatConst);
    }
}