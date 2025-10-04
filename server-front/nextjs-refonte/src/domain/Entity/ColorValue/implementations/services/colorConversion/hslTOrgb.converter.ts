import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { RGBColor } from "@/domain/Entity/ColorValue/implementations/core/rgb";
import { IHSLColor, IRGBColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";
import { roundToPrecision } from "@/shared/utils/format.utils";



/**
 * Convertisseur HSL -> RGB.
 * Permet de convertir une couleur HSL (manipulation/design) en couleur RGB (affichage digital).
 *
 * Exemple d'utilisation :
 * ```typescript
 * const converter = new HSLTORGBConverter();
 * const rgb = converter.convert(hslColor);
 * ```
 */
export class HSLTORGBConverter implements IConverter<IHSLColor, IRGBColor> {
    /**
     * Convertit une couleur HSL en RGB.
     * - Normalise les valeurs HSL
     * - Calcule les composantes RGB
     * - Gère le cas achromatique (gris)
     * @param from Couleur HSL à convertir
     * @returns Couleur RGB équivalente
     */
    convert(from: IHSLColor): IRGBColor {
        if (from.format !== FormatConst.HSL) {
            throw new Error("Input color must be in HSL format");
        }

        const h = from.value.h / 360; // Normalisation de la teinte
        const s = from.value.s / 100; // Normalisation de la saturation
        const l = from.value.l / 100; // Normalisation de la luminosité
        let r: number, g: number, b: number;

        if (s !== 0) {
            // Calcul des composantes RGB
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = this.hueToRGB(p, q, h + 1 / 3);
            g = this.hueToRGB(p, q, h);
            b = this.hueToRGB(p, q, h - 1 / 3);

            r = roundToPrecision(r * 255, 0);
            g = roundToPrecision(g * 255, 0);
            b = roundToPrecision(b * 255, 0);
            return new RGBColor(r, g, b);
        }

        // Cas achromatique (gris)
        r = g = b = roundToPrecision(l * 255, 0);
        return new RGBColor(r, g, b);
    }

    /**
     * Fonction utilitaire pour ajuster la teinte lors de la conversion HSL -> RGB.
     */
    private hueToRGB(p: number, q: number, t: number): number {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
}
