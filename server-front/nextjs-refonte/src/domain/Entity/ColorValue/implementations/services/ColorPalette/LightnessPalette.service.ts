import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ILightnessAdjustmentService } from "@/domain/Entity/ColorValue/core/interfaces/service/lightnessAdjustment.interface";
import { BasePaletteGenerator } from "@/domain/Entity/ColorValue/core/interfaces/service/palette.interface";

abstract class BaseLightnessPaletteService extends BasePaletteGenerator {
    abstract name: string;

    constructor(
        baseColor: IColor,
        private lightnessAdjustmentService: ILightnessAdjustmentService,
        private adjustment: (amount: number) => number
    ) {
        super(baseColor);
    }

    calculateColor(color: IColor, amount: number): IColor {
        return this.lightnessAdjustmentService.adjustLightness(color, this.adjustment(amount));
    }
}

export class DarkenPaletteService extends BaseLightnessPaletteService {
    name = "Darken Palette";

    constructor(baseColor: IColor, lightnessAdjustmentService: ILightnessAdjustmentService) {
        super(baseColor, lightnessAdjustmentService, (amount) => -amount);
    }
}

export class LightenPaletteService extends BaseLightnessPaletteService {
    name = "Lighten Palette";

    constructor(baseColor: IColor, lightnessAdjustmentService: ILightnessAdjustmentService) {
        super(baseColor, lightnessAdjustmentService, (amount) => amount);
    }
}