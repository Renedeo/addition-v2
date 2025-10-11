import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { PaletteInterface } from "@/domain/Entity/ColorValue/core/interfaces/color/palette/palette.interface";
import { IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { EnhancedLightnessService } from "@/domain/Entity/ColorValue/implementations/services/Enhance/enhanceLightness.service";
import { EnhanceSaturationService } from "@/domain/Entity/ColorValue/implementations/services/Enhance/enhanceSaturation.service";

/**
 * Abstract class `ColorEnhancementPaletteService` that extends the `PaletteInterface`.
 * This class provides a foundation for implementing color enhancement services
 * by utilizing an enhancement service to adjust and enhance colors based on a base color.
 *
 * @abstract
 */
abstract class ColorEnhancementPaletteService extends PaletteInterface {

    /**
     * Constructs a new instance of `ColorEnhancementPaletteService`.
     *
     * @param baseColor - The base color to be used for enhancement operations.
     */
    constructor(baseColor: IColor) {
        super(baseColor);
    }

    /**
     * Calculates an enhanced color based on the provided adjustment amount.
     *
     * @param amount - The amount by which the color should be adjusted. Defaults to 10.
     * @returns The enhanced color as an `IColor` instance.
     */
    protected calculateColor(amount: number = 10): IColor {
        const adjustedAmount = this.getAdjustedAmount(amount);
        return this.getEnhancementService().enhanceColor(this.baseColor, adjustedAmount);
    }

    /**
     * Abstract method to determine the adjusted amount for color enhancement.
     * This method must be implemented by subclasses.
     *
     * @param amount - The original adjustment amount.
     * @returns The adjusted amount for color enhancement.
     */
    protected abstract getAdjustedAmount(amount: number): number;

    /**
     * Abstract method to retrieve the enhancement service.
     * This method must be implemented by subclasses.
     *
     * @returns An instance of `IEnhancedColorService` to be used for color enhancement.
     */
    protected abstract getEnhancementService(): IEnhancedColorService;
}

/**
 * Service de palette de couleurs qui assombrit une couleur de base.
 * Utilise le service d'amélioration de la luminosité pour générer des couleurs plus foncées.
 * Exemple d'utilisation :
 * ```typescript
 * import { ColorFormatService } from '@/shared/services/colorFormat.service';
 * const colorFormatter = new ColorFormatService();
 * const baseColor: IColor = { /* ... *\/ };
 * const darkenService = new DarkenPaletteService(baseColor, colorFormatter);
 * ```
 */
export class DarkenPaletteService extends ColorEnhancementPaletteService {
    name = "darken";
    constructor(baseColor: IColor, private colorFormatter: IColorFormatHandler) {
        super(baseColor);
    }

    protected getAdjustedAmount(amount: number): number {
        return -amount;
    }
    protected getEnhancementService(): IEnhancedColorService {
        return new EnhancedLightnessService(this.colorFormatter);
    }

}

/**
 * Service de palette de couleurs qui éclaircit une couleur de base.
 * Utilise le service d'amélioration de la luminosité pour générer des couleurs plus claires.
 * Exemple d'utilisation :
 * ```typescript
 * import { ColorFormatService } from '@/shared/services/colorFormat.service';
 * const colorFormatter = new ColorFormatService();
 * const baseColor: IColor = { /* ... *\/ };
 * const lightenService = new LightenPaletteService(baseColor, colorFormatter);
 * ```
 */
export class LightenPaletteService extends DarkenPaletteService {
    name = "lighten";

    protected getAdjustedAmount(amount: number): number {
        return amount;
    }
}

/**
 * Service de palette de couleurs qui augmente la saturation d'une couleur de base.
 * Utilise le service d'amélioration de la saturation pour générer des couleurs plus saturées.
 * Exemple d'utilisation :
 * ```typescript
 * import { ColorFormatService } from '@/shared/services/colorFormat.service';
 * const colorFormatter = new ColorFormatService();
 * const baseColor: IColor = { /* ... *\/ };
 * const saturateService = new SaturatePaletteService(baseColor, colorFormatter);
 * ```
 */
export class SaturatePaletteService extends ColorEnhancementPaletteService {
    name = "saturate";

    constructor(baseColor: IColor, private colorFormatter: IColorFormatHandler) {
        super(baseColor);
    }
    protected getAdjustedAmount(amount: number): number {
        return amount;
    }
    protected getEnhancementService(): IEnhancedColorService {
        return new EnhanceSaturationService(this.colorFormatter);
    }
}

/**
 * Service de palette de couleurs qui diminue la saturation d'une couleur de base.
 * Utilise le service d'amélioration de la saturation pour générer des couleurs moins saturées.
 * Exemple d'utilisation :
 * ```typescript
 * import { ColorFormatService } from '@/shared/services/colorFormat.service';
 * const colorFormatter = new ColorFormatService();
 * const baseColor: IColor = { /* ... *\/ };
 * const desaturateService = new DesaturatePaletteService(baseColor, colorFormatter);
 * ```
 */
export class DesaturatePaletteService extends SaturatePaletteService {
    name = "desaturate";

    protected getAdjustedAmount(amount: number): number {
        return -amount;
    }
}