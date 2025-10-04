
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ColorFormat, RGBColorValue } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";

/**
 * Classe représentant une couleur au format RGB.
 * Permet de manipuler et valider les couleurs RGB avec alpha optionnel.
 *
 * Exemple d'utilisation :
 * ```typescript
 * const rgbColor = new RGBColor(255, 87, 51, 0.8);
 * console.log(rgbColor.stringValue()); // "rgba(255, 87, 51, 0.8)"
 * ```
 */
export class RGBColor implements IRGBColor {
    format: ColorFormat = FormatConst.RGB;
    value: RGBColorValue;
    a?: number;

    /**
     * Crée une instance de RGBColor.
     * @param r composante rouge (0-255)
     * @param g composante verte (0-255)
     * @param b composante bleue (0-255)
     * @param a alpha (opacité, 0-1, optionnel)
     * @throws {Error} Si une composante ou alpha est invalide
     */
    constructor(r: number, g: number, b: number, a: number = 1) {
        if (this.isValid(r, g, b, a) === false) {
            throw new Error("Invalid RGB or Alpha values");
        }
        this.value = { r, g, b };
        if (a) this.a = a;
    } 

    /**
     * Retourne la valeur RGB/RGBA sous forme de string.
     */
    stringValue(): string {
        const r = this.value.r;
        const g = this.value.g;
        const b = this.value.b;
        if (this.a) return `rgba(${r}, ${g}, ${b}, ${Math.round(this.a * 100) / 100})`;
        return `rgb(${r}, ${g}, ${b})`;
    }

    /**
     * Vérifie si les valeurs RGB et alpha sont valides.
     * @param r composante rouge
     * @param g composante verte
     * @param b composante bleue
     * @param a alpha
     * @returns {boolean} True si les valeurs sont valides, sinon false
     */
    private isValid(r: number, g: number, b: number, a: number): boolean {
        const isValidNumber = (n: number) => typeof n === 'number' && !isNaN(n);
        const isInRange = (n: number, min: number, max: number) => n >= min && n <= max;
        const isValidRGB = [r, g, b].every(v => isValidNumber(v) && isInRange(v, 0, 255));
        return isValidRGB && isInRange(a, 0, 1);
    }
}