import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorValidator } from "@/domain/Entity/ColorValue/core/interfaces/service/validation.interface";

export class HEXValidation implements IColorValidator {
    isValid(color: IColor): boolean {

        if (color.format !== "HEX") {
            return false;
        }
        const hex = color.value as string;
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexRegex.test(hex);
    }
}