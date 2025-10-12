
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IHSLColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ColorFormat, HSLColorValue } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";
import { isValidNumber, isValidHue, isValidPercentage, isValidAlpha } from "@/shared/utils/validation.utils";
import { roundToPrecision } from "@/shared/utils/format.utils";

/**
 * Classe représentant une couleur au format HSL.
 * Permet de manipuler et valider les couleurs HSL avec alpha optionnel.
 *
 * @example
 * ```typescript
 * const hslColor = new HSLColor(10, 80, 50, 0.7);
 * const colorString = hslColor.stringValue(); // "hsl(10°, 80%, 50%, 0.7)"
 * ```
 */
export class HSLColor implements IHSLColor {
    format: ColorFormat = FormatConst.HSL;
    value: HSLColorValue;
    a?: number;

    /**
     * Crée une instance de HSLColor.
     * @param h Hue (teinte, 0-360)
     * @param s Saturation (0-100)
     * @param l Lightness (0-100)
     * @param a Alpha (opacité, 0-1, optionnel)
     * @throws {Error} Si une composante ou alpha est invalide
     */
    constructor(h: number, s: number, l: number, a: number = 1) {
        if (this.isValid(h, s, l, a) === false) {
            throw new Error("Invalid HSL or Alpha values");
        }
        this.value = { h, s, l };

        if (a) this.a = a;
    }

    /**
     * Retourne la valeur HSL/HSLA sous forme de string.
     */
    stringValue(): string {
        const h = this.value.h;
        const s = this.value.s;
        const l = this.value.l;
        if (this.a) return `hsl(${h}°, ${s}%, ${l}%${this.a !== undefined ? `, ${roundToPrecision(this.a, 2)}` : ""})`;
        return `hsl(${h}°, ${s}%, ${l}%)`;
    }

    /**
     * Vérifie si les valeurs HSL et alpha sont valides.
     * @param h Hue
     * @param s Saturation
     * @param l Lightness
     * @param a Alpha
     * @returns {boolean} True si les valeurs sont valides, sinon false
     */
    private isValid(h: number, s: number, l: number, a: number): boolean {
        const isValidHSL = isValidNumber(h) && isValidHue(h) &&
                          isValidNumber(s) && isValidPercentage(s) &&
                          isValidNumber(l) && isValidPercentage(l);
        return isValidHSL && isValidAlpha(a);
    }
}