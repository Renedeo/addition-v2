import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorFormatter } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";
import { IColorConversionService } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/colorConversion.service";

export class IFormatter implements IColorFormatter {
    constructor(private conversionService:IColorConversionService) {}
    
    colorFormatter(color:IColor, to:ColorFormat): IColor {
        const conversionService = this.conversionService;
        const colorResult = conversionService.convert<IColor, IColor>(color, color.format, to);
        return colorResult;
    }

    supportedFormats(): string[] {
       return this.conversionService.getSupportedFormats();
    }

    toOriginalFormat(color: IColor, modifiedColor: IColor): IColor {
        if (color.format === modifiedColor.format) return modifiedColor;
        const originalColor = this.conversionService.convert<IColor, IColor>(modifiedColor, modifiedColor.format, color.format);
        return originalColor;
    }
}


