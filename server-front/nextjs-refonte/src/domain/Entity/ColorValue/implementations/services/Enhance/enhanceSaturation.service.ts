import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IHSLColor, IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";
import { IColorFormatter } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";

export class EnhanceSaturationService implements IEnhancedColorService{
    constructor( private colorFormatter: IColorFormatter) {}

    enhanceColor(color: IColor, amount: number): IColor {
        const preferredFormat: IHSLColor = this.colorFormatter.colorFormatter(color, FormatConst.HSL) as IHSLColor;
        const saturation = preferredFormat.value.s
        // increased Saturation
        preferredFormat.value.s = Math.min(1, Math.max(0, saturation + amount));
        
        return this.colorFormatter.toOriginalFormat(color, preferredFormat) 
    }
}