import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ColorFormat, HEXColorValue } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";

export class HEXColor implements IHEXColor {
    format: ColorFormat = FormatConst.HEX;
    value: HEXColorValue;
    a: number;
    
    constructor(hex: string, a: number = 1) {
        if (this.isValid(hex, a) === false) {
            throw new Error("Invalid HEX or Alpha values");
        }
        this.value = { hex };
        this.a = a;
    }

    toString(): string {
    const hex = this.value.hex;
    const begin = hex.startsWith("#") ? "" : "#";
    // const alpha = Math.round(this.a * 255).toString(16).padStart(2, "0");
    // return `${begin}${hex}${alpha}`;
    return `${begin}${hex}`;
}

    private isValid(hex: string, a: number): boolean {
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const isValidHex = hexRegex.test(hex);
        const isInRange = (n: number, min: number, max: number) => n >= min && n <= max;
        return isValidHex && isInRange(a, 0, 1);
    }
}