import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IHSLColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ColorFormat, HSLColorValue } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";

export class HSLColor implements IHSLColor {
    format: ColorFormat = FormatConst.HSL;
    value: HSLColorValue;
    a: number;

    constructor(h: number, s: number, l: number, a: number = 1) {
        if (this.isValid(h, s, l, a) === false) {
            throw new Error("Invalid HSL or Alpha values");
        }
        this.value = { h, s, l };
        this.a = a;
    }

    toString(): string {
        const h = this.value.h;
        const s = this.value.s;
        const l = this.value.l;
        const a = this.a;
        return `hsl(${h}°, ${s}%, ${l}%${a !== undefined ? `, ${Math.round(a * 100) / 100}` : ""})`;
    }

    private isValid(h: number, s: number, l: number, a: number): boolean {
        const isValidNumber = (n: number) => typeof n === 'number' && !isNaN(n);
        const isInRange = (n: number, min: number, max: number) => n >= min && n <= max;
        const isValidHSL = isValidNumber(h) && isInRange(h, 0, 360) &&
                          isValidNumber(s) && isInRange(s, 0, 100) &&
                          isValidNumber(l) && isInRange(l, 0, 100);
        return isValidHSL && isInRange(a, 0, 1);
    }
}