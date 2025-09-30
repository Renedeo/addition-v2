import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IColor, RGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorComparisonService, IColorContrastResult } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";
import { IColorFormatter } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";
import { ColorConversionFactory } from "@/domain/Entity/ColorValue/implementations/factory/ColorConversion.factory";
import { LightnessService } from "@/domain/Entity/ColorValue/implementations/services/colorAnalysis/lightness.service";
import { IColorConversionService } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/colorConversion.service";

export class ColorContrastService implements IColorComparisonService<IColor, IColor, IColorContrastResult>, IColorFormatter {
    compareColors(color1: IColor, color2: IColor): IColorContrastResult {
        
        const rgbColor1 = this.preferredFormat(color1);
        const rgbColor2 = this.preferredFormat(color2);

        // Placeholder implementation
        const contrastRatio = this.calculateContrastRatio(rgbColor1, rgbColor2);
        // For Normal text, WCAG AA requires a contrast ratio of at least 4.5:1, and AAA requires 7:1
        const isAccessible = contrastRatio >= 4.5;
        const level = contrastRatio >= 7 ? "AAA" : contrastRatio >= 4.5 ? "AA" : "Fail";

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
                normalText: level,
                largeText: largeTextLevel
            },
            description: "Not implemented"
        };
    }

    preferredFormat(color: IColor): RGBColor {
        const factory = new ColorConversionFactory()
        const registry = factory.createDefaultRegistry();
        const conversionService = new IColorConversionService(registry);
        const rgbColor = conversionService.convert<IColor, RGBColor>(color, color.format as ColorFormat, FormatConst.RGB);
        return rgbColor;
    }

    private calculateContrastRatio(foregroundColor: RGBColor, backgroundColor: RGBColor): number {
        const luminanceService = new LightnessService();
        const luminance1 = luminanceService.analyzeColor(foregroundColor).lightness + 0.05;
        const luminance2 = luminanceService.analyzeColor(backgroundColor).lightness + 0.05;

        return luminance1 > luminance2
            ? luminance1 / luminance2
            : luminance2 / luminance1;
    }

    supportedFormats(): ColorFormat[] {
        return Object.values(FormatConst);
    }
}