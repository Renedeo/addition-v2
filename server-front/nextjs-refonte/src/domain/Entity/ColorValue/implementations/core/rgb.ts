import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ColorFormat, RGBColorValue } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";

export class RGBColor implements IRGBColor {
    format: ColorFormat = FormatConst.RGB;
    value: RGBColorValue;
    a: number;

    constructor(r: number, g: number, b: number, a: number = 1) {
        if (this.isValid(r, g, b, a) === false) {
            throw new Error("Invalid RGB or Alpha values");
        }
        this.value = { r, g, b };
        this.a = a;
    } 

    toString(): string {
        const r = this.value.r;
        const g = this.value.g;
        const b = this.value.b;
        const a = this.a;
        return `rgb(${r}, ${g}, ${b}${a !== undefined ? `, ${Math.round(a * 100) / 100}` : ""})`;
    }

    private isValid(r: number, g: number, b: number, a: number): boolean {
        const isValidNumber = (n: number) => typeof n === 'number' && !isNaN(n);
        const isInRange = (n: number, min: number, max: number) => n >= min && n <= max;
        const isValidRGB = [r, g, b].every(v => isValidNumber(v) && isInRange(v, 0, 255));
        return isValidRGB && isInRange(a, 0, 1);
    }
}