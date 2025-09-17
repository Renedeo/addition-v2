import { IConverter } from "../../core/interfaces/service/converter.interface";
import { HEXColor, RGBColor } from "../../core/types/colorRepresention.types";

/**
 * Class responsible for converting RGB color values to HEX color values.
 * The RGB (Red, Green, Blue) color model is commonly used for digital displays,
 * while the HEX (Hexadecimal) color model is often used in web design and development
 * for specifying colors in HTML and CSS. This class facilitates the conversion between
 * these two models.
 * @see https://en.wikipedia.org/wiki/Web_colors#Hex_triplet
 */
export class RGBTOHEXConverter implements IConverter<RGBColor, HEXColor> {
    /**
     * Converts an RGB color value to its HEX representation.
     * The conversion process involves:
     * - Converting each of the RGB components (red, green, blue) from their decimal
     *   values (0-255) to their hexadecimal equivalents (00-FF).
     * - Concatenating the hexadecimal values of the red, green, and blue components
     *   into a single string prefixed with a '#' character to form the HEX color code.
     * @param from - The RGB color value to be converted, including its alpha channel.
     * @returns The equivalent HEX color value, including the alpha channel.
     */
    convert(from: RGBColor): HEXColor {
        const rHex = toHEX(from.r);
        const gHex = toHEX(from.g);
        const bHex = toHEX(from.b);
        const hex = `#${rHex}${gHex}${bHex}`;
        return { hex, a: from.a } as HEXColor;
    }
}
/**
 * Converts a RGB color value to its HEX representation.
 * @param value The RGB color value (0-255).
 * @returns The HEX representation of the color.
 */
const toHEX = (value: number) => {
    if (!isInRange(value, 0, 255)) {
        throw new Error("RGB values must be in the range 0-255.");
    }
    const hex = Math.round(value).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
};

function isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}