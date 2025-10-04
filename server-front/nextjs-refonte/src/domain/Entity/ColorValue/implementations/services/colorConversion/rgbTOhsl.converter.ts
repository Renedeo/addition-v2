import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { HSLColor } from "@/domain/Entity/ColorValue/implementations/core/hsl";
import { IHSLColor, IRGBColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";


/**
 * Convertisseur RGB -> HSL.
 * Permet de convertir une couleur RGB (affichage digital) en couleur HSL (manipulation/design).
 *
 * Exemple d'utilisation :
 * ```typescript
 * const converter = new RGBToHSLConverter();
 * const hsl = converter.convert(rgbColor);
 * ```
 */
export class RGBToHSLConverter implements IConverter<IRGBColor, IHSLColor> {
    /**
     * Convertit une couleur RGB en HSL.
     * - Normalise les valeurs RGB
     * - Calcule le max, min, la différence
     * - Déduit la teinte, la saturation et la luminosité
     * @param from Couleur RGB à convertir
     * @returns Couleur HSL équivalente
     */
    convert(from: IRGBColor): IHSLColor {
        if (from.format !== FormatConst.RGB) {
            throw new Error("Input color must be in RGB format");
        }

        const r = from.value.r / 255;
        const g = from.value.g / 255;
        const b = from.value.b / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h: number = 0;
        let s: number = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        h = Math.round(h * 360);
        s = Math.round(s * 100);
        const lPercent = Math.round(l * 100);
        return new HSLColor(h, s, lPercent);
    }
}