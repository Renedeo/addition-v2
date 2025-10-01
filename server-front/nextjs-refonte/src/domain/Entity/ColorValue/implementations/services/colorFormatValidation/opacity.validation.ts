import { IColor, IColorWithAlpha } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorValidator } from "@/domain/Entity/ColorValue/core/interfaces/service/validation.interface";

const MIN_OPACITY_VALUE = 0;
const MAX_OPACITY_VALUE = 1;

export class OpacityValidation implements IColorValidator {
    isValid(color: IColorWithAlpha): boolean {
        if (!color.format) {
            return false;
        }
        const opacity = color.a ? color.a as number : 1;
        return this.isValidOpacity(opacity);
    }

    private isValidOpacity(value: number): boolean {
        if (typeof value !== "number" || isNaN(value)) {
            throw new Error("Opacity must be a valid number");
        }
        if (value < MIN_OPACITY_VALUE || value > MAX_OPACITY_VALUE) {
            throw new Error(`Opacity must be between ${MIN_OPACITY_VALUE} and ${MAX_OPACITY_VALUE}`);
        }
        return true;
    }
}