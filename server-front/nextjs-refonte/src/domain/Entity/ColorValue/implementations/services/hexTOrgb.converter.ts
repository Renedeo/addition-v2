import { HEXColor, RGBColor } from "../../core/interfaces/color/color.interface";
import { IConverter } from "../../core/interfaces/service/converter.interface";

/**
 * Class responsible for converting HEX color values to RGB color values.
 * The HEX (Hexadecimal) color model is often used in web design and development
 * for specifying colors in HTML and CSS, while the RGB (Red, Green, Blue) color
 * model is commonly used for digital displays. This class facilitates
 * the conversion between these two models.
 * @see https://en.wikipedia.org/wiki/Web_colors#Hex_triplet
 */
export class HexToRGBConverter implements IConverter<HEXColor, RGBColor> {
    /**
     * Converts a HEX color value to its equivalent RGB representation.
     * The conversion process involves:
     * - Removing the '#' prefix if present.
     * - Handling both 3-character (shorthand) and 6-character HEX formats.
     * - Parsing the hexadecimal values to obtain the red, green, and blue components.
     * - If an 8-character HEX format is provided, the alpha channel is also extracted and converted to a decimal value between 0 and 1.
     * - The resulting RGB values are returned in an object, with the alpha channel included if it was specified in the HEX input.
     * @param from - The HEX color to convert, including its alpha channel if specified. Must be of type {@link HEXColor}.
     * @return The equivalent RGB color, including the alpha channel if specified.
     */
        convert(from: HEXColor): RGBColor {

        if (from.format !== 'HEX') {
            throw new Error("Input color format must be HEX.");
        }

        // Suppression du '#' si présent
        if (from.value.hex.startsWith('#')) { 
            from.value.hex = from.value.hex.slice(1);
        }
        // Gestion des formats courts (3 ou 4 caractères)
        if (from.value.hex.length === 3 || from.value.hex.length === 4) {
            from.value.hex = from.value.hex.split('').map((char: string) => char + char).join('');
        }
        if (from.value.hex.length !== 6 && from.value.hex.length !== 8) {
            throw new Error("Invalid HEX color format. Expected formats: #RRGGBB or #RRGGBBAA.");
        }
        const r = parseInt(from.value.hex.slice(0, 2), 16);
        const g = parseInt(from.value.hex.slice(2, 4), 16);
        const b = parseInt(from.value.hex.slice(4, 6), 16);
        const a = from.value.hex.length === 8 ? parseInt(from.value.hex.slice(6, 8), 16) / 255 : undefined;

        return { format: 'RGB', value: { r, g, b }, a } as RGBColor;
    }
}