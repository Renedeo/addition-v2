import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { HSLColor, IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";
import { IColorConversionService } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/colorConversion.service";

export class  IEnhancedLighnessService implements IEnhancedColorService<IColor, IColor> {
    constructor(private ConversionService: IColorConversionService) {}
    enhanceColor(color: IColor, amount: number): IColor {
        const preferredFormat: HSLColor = this.preferredFormat(color);
        const lightness = preferredFormat.value.l
        
        // enhanced lightness
        preferredFormat.value.l = Math.min(1, Math.max(0, lightness + amount));

        // return to original format
        return this.toOriginalFormat(color, preferredFormat);
    }

    preferredFormat(color: IColor): HSLColor {
        if (color.format === FormatConst.HSL) return color as HSLColor;
        const hslColor = this.ConversionService.convert<typeof color, HSLColor>(color, color.format, FormatConst.HSL);
        return hslColor; //
    }

    supportedFormats(): ColorFormat[] {
        return Object.values(FormatConst)
    }

    private toOriginalFormat(color: IColor, modifiedColor: HSLColor): IColor {
        if (color.format === FormatConst.HSL) return modifiedColor as IColor;
        const originalColor = this.ConversionService.convert<HSLColor, typeof color>(modifiedColor, FormatConst.HSL, color.format);
        return originalColor; //
    }
} 