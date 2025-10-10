import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { BasePaletteGenerator } from "@/domain/Entity/ColorValue/core/interfaces/service/palette.interface";
import { ISaturationAdjustmentService } from "@/domain/Entity/ColorValue/core/interfaces/service/saturationAdjustment.interface";

abstract class BaseSaturationPaletteService extends BasePaletteGenerator {
    abstract name: string;

    constructor(
        baseColor: IColor,
        private saturationAdjustmentService: ISaturationAdjustmentService,
        private adjustment: (amount: number) => number
    ) {
        super(baseColor);
    }

    calculateColor(color: IColor, amount: number): IColor {
        return this.saturationAdjustmentService.adjustSaturation(color, this.adjustment(amount));
    }
}

export class SaturatePaletteService extends BaseSaturationPaletteService {
    name = "Saturate Palette";

    constructor(baseColor: IColor, saturationAdjustmentService: ISaturationAdjustmentService) {
        super(baseColor, saturationAdjustmentService, (amount) => amount);
    }
}

export class DesaturatePaletteService extends BaseSaturationPaletteService {
    name = "Desaturate Palette";

    constructor(baseColor: IColor, saturationAdjustmentService: ISaturationAdjustmentService) {
        super(baseColor, saturationAdjustmentService, (amount) => -amount);
    }
}