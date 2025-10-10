import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { HEXColor } from "@/domain/Entity/ColorValue/implementations/core/hex";
import { IHEXColor, IRGBColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";
import { isValidRGBValue } from "@/shared/utils/validation.utils";
import { toHexString } from "@/shared/utils/format.utils";



/**
 * Convertisseur RGB -> HEX.
 * Permet de convertir une couleur RGB (affichage digital) en couleur HEX (web).
 *
 * Exemple d'utilisation :
 * ```typescript
 * const converter = new RGBTOHEXConverter();
 * const hex = converter.convert(rgbColor);
 * ```
 */
export class RGBTOHEXConverter implements IConverter<IRGBColor, IHEXColor> {
    /**
     * Convertit une couleur RGB en HEX.
     * - Convertit chaque composante RGB en hexadécimal
     * - Concatène les valeurs en une string HEX
     * @param from Couleur RGB à convertir
     * @returns Couleur HEX équivalente
     */
    convert(from: IRGBColor): IHEXColor {
        if (from.format !== FormatConst.RGB) {
            throw new Error("Input color must be in RGB format");
        }

        const rHex = this.toHEX(from.value.r);
        const gHex = this.toHEX(from.value.g);
        const bHex = this.toHEX(from.value.b);
        const hex = `#${rHex}${gHex}${bHex}`;
        return new HEXColor(hex);
    }

    /**
     * Convertit une valeur décimale (0-255) en hexadécimal (00-FF).
     * Utilise les utilitaires partagés pour la validation et la conversion.
     */
    private toHEX(value: number): string {
        if (!isValidRGBValue(value)) {
            throw new Error("RGB component must be between 0 and 255");
        }
        return toHexString(value);
    }
}
