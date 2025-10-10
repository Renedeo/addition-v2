import { IColor, IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorEnhancer, IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";

export class ColorEnhancer implements IColorEnhancer {
    constructor(private colorFormatter: IColorFormatHandler,
        private enhanceLightnessService: IEnhancedColorService,
        private enhanceSaturationService: IEnhancedColorService
    ) { }

    darken(color:IColor, percentage: number): IColor {
        return this.enhanceLightnessService.enhanceColor(color, -percentage);
    }
    lighten(color:IColor, percentage: number): IColor {
        return this.enhanceLightnessService.enhanceColor(color, percentage);
    }
    saturate(color:IColor, percentage: number): IColor {
        return this.enhanceSaturationService.enhanceColor(color, percentage);
    }
    desaturate(color:IColor, percentage: number): IColor {
        return this.enhanceSaturationService.enhanceColor(color, -percentage);
    }
    invert(color:IColor): IColor {
        const invertedColor = { ...this.colorFormatter.formatColor(color, 'RGB') } as IRGBColor;
        invertedColor.value.r = 255 - invertedColor.value.r;
        invertedColor.value.g = 255 - invertedColor.value.g;
        invertedColor.value.b = 255 - invertedColor.value.b;
        return invertedColor;
    }
}