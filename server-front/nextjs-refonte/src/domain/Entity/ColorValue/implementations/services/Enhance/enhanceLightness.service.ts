import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IHSLColor, IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";
import { IColorFormatter } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";

export class EnhancedLightnessService implements IEnhancedColorService {
    constructor(private colorFormatter: IColorFormatter) { }

    enhanceColor(color: IColor, amount: number): IColor {
        const preferredFormat: IHSLColor = this.colorFormatter.colorFormatter(color, FormatConst.HSL) as IHSLColor;
        const lightness = preferredFormat.value.l;

        // enhanced lightness
        preferredFormat.value.l = Math.min(1, Math.max(0, lightness + amount));

        // return to original format
        return this.colorFormatter.toOriginalFormat(color, preferredFormat);
    }
} 