import { ISaturationAdjustmentService } from "@/domain/Entity/ColorValue/core/interfaces/service/saturationAdjustment.interface";
import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { EnhanceSaturationService } from "@/domain/Entity/ColorValue/implementations/services/Enhance/enhanceSaturation.service";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";

export class SaturationAdjustmentService implements ISaturationAdjustmentService {
    constructor(private colorFormatter: IColorFormatHandler) {}

    adjustSaturation(color: IColor, amount: number): IColor {
        const saturationService = new EnhanceSaturationService(this.colorFormatter);
        return saturationService.enhanceColor(color, amount);
    }
}