import { ILightnessAdjustmentService } from "@/domain/Entity/ColorValue/core/interfaces/service/lightnessAdjustment.interface";
import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { EnhancedLightnessService } from "@/domain/Entity/ColorValue/implementations/services/Enhance/enhanceLightness.service";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";

export class LightnessAdjustmentService implements ILightnessAdjustmentService {
    constructor(private colorFormatter: IColorFormatHandler) {}

    adjustLightness(color: IColor, amount: number): IColor {
        const lightnessService = new EnhancedLightnessService(this.colorFormatter);
        return lightnessService.enhanceColor(color, amount);
    }
}