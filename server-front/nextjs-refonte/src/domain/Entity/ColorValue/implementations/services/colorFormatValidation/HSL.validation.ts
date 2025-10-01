import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorValidator } from "@/domain/Entity/ColorValue/core/interfaces/service/validation.interface";

const MIN_HSL_VALUE = 0;
const MAX_HUE_VALUE = 359;

const MIN_PERCENTAGE_VALUE = 0;
const MAX_PERCENTAGE_VALUE = 100;


export class HSLValidation implements IColorValidator {
    isValid(color: IColor): boolean {

        if (color.format !== "HSL") {
            return false;
        }
        const { h, s, l } = color.value as { h: number; s: number; l: number };
        return (
            this.isValidHue(h) &&
            this.isValidPercentage(s) &&
            this.isValidPercentage(l)
        );
    }

    private isValidHue(value: number): boolean {
        if (typeof value !== "number" || isNaN(value)) {
            throw new Error("Hue must be a valid number");
        }
        if (value < MIN_HSL_VALUE || value > MAX_HUE_VALUE) {
            throw new Error(`Hue must be between ${MIN_HSL_VALUE} and ${MAX_HUE_VALUE}`);
        }
        return true;
    }

    private isValidPercentage(value: number): boolean {
        if (typeof value !== "number" || isNaN(value)) {
            throw new Error("Percentage must be a valid number");
        }
        if (value < MIN_PERCENTAGE_VALUE || value > MAX_PERCENTAGE_VALUE) {
            throw new Error(`Percentage must be between ${MIN_PERCENTAGE_VALUE} and ${MAX_PERCENTAGE_VALUE}`);
        }
        return true;
    }
}