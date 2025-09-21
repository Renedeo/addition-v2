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
        const lightness = 0.2126 * rgbColor.value.r + 0.7152 * rgbColor.value.g + 0.0722 * rgbColor.value.b;

        
        
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