import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { RGBColor } from "@/domain/Entity/ColorValue/implementations/core/rgb";
import { IHEXColor, IRGBColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";


/**
 * Convertisseur HEX -> RGB.
 * Permet de convertir une couleur HEX (web) en couleur RGB (affichage digital).
 * Gère les formats courts, longs et alpha.
 *
 * Exemple d'utilisation :
 * ```typescript
 * const converter = new HexToRGBConverter();
 * const rgb = converter.convert(hexColor);
 * ```
 */
export class HexToRGBConverter implements IConverter<IHEXColor, IRGBColor> {
    /**
     * Convertit une couleur HEX en RGB.
     * - Retire le '#' si présent
     * - Gère les formats courts (3/4 caractères) et longs (6/8)
     * - Extrait les composantes R, G, B et alpha si présent
     * @param from Couleur HEX à convertir
     * @returns Couleur RGB équivalente
     */
    convert(from: IHEXColor): IRGBColor {
        if (from.format !== FormatConst.HEX) {
            throw new Error("Input color format must be HEX.");
        }

        let hexValue = from.value.hex;
        // Retire le '#' si présent
        if (hexValue.startsWith('#')) {
            hexValue = hexValue.slice(1);
        }
        // Format court (3 ou 4 caractères)
        if (hexValue.length === 3 || hexValue.length === 4) {
            hexValue = hexValue.split('').map((char: string) => char + char).join('');
        }
        if (hexValue.length !== 6 && hexValue.length !== 8) {
            throw new Error("Invalid HEX color format. Expected formats: #RRGGBB or #RRGGBBAA.");
        }
        const r = parseInt(hexValue.slice(0, 2), 16);
        const g = parseInt(hexValue.slice(2, 4), 16);
        const b = parseInt(hexValue.slice(4, 6), 16);
        let a;
        if (hexValue.length === 8) {
            a = parseInt(hexValue.slice(6, 8), 16) / 255;
            return new RGBColor(r, g, b, a);
        }
        return new RGBColor(r, g, b);
    }
}