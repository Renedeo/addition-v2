import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorValidator } from "@/domain/Entity/ColorValue/core/interfaces/service/validation.interface";

const MIN_RGB_VALUE = 0;
const MAX_RGB_VALUE = 255;

export class RGBValidation implements IColorValidator {
    isValid(color: IColor): boolean {

        if (color.format !== "RGB") {
            return false;
        }
        
        const { r, g, b } = color.value as { r: number; g: number; b: number };
        return (
            this.isValidRGBComponent(r) &&
            this.isValidRGBComponent(g) &&
            this.isValidRGBComponent(b)
        );

    }

    private isValidRGBComponent(value: number): boolean {
        if (typeof value !== "number" || isNaN(value)) {
            throw new Error("RGB component must be a valid number");
        }
        if (value < MIN_RGB_VALUE || value > MAX_RGB_VALUE) {
            throw new Error(`RGB component must be between ${MIN_RGB_VALUE} and ${MAX_RGB_VALUE}`);
        }
        return true;
    }
}