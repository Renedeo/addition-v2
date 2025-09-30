import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { HSLColor, IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";
import { IColorFormatter } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";
import { ColorConversionFactory } from "@/domain/Entity/ColorValue/implementations/factory/ColorConversion.factory";
import { IColorConversionService } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/colorConversion.service";

export class EnhanceSaturationService implements IEnhancedColorService<IColor, HSLColor>, IColorFormatter {
    enhanceColor(color: IColor, amount: number): HSLColor {
        const preferredFormat: HSLColor = this.preferredFormat(color);
        const saturation = preferredFormat.value.s
        // increased Saturation
        preferredFormat.value.s = Math.min(1, Math.max(0, saturation + amount));
        return preferredFormat;
    }

    preferredFormat(color: IColor): HSLColor {
        const factory = new ColorConversionFactory();
        const registry = factory.createDefaultRegistry();
        const conversionService = new IColorConversionService(registry);
        const hslColor = conversionService.convert<IColor, HSLColor>(color, color.format, FormatConst.HSL);
        // Here you would implement the logic to enhance the saturation of the HSL color
        return hslColor; // Placeholder return
    }

    supportedFormats(): ColorFormat[] {
        return Object.values(FormatConst)
    }

}