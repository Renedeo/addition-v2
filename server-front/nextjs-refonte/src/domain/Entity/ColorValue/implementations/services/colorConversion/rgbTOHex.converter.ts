import { IHEXColor, IRGBColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";

/**
 * Class responsible for converting RGB color values to HEX color values.
 * The RGB (Red, Green, Blue) color model is commonly used for digital displays,
 * while the HEX (Hexadecimal) color model is often used in web design and development
 * for specifying colors in HTML and CSS. This class facilitates the conversion between
 * these two models.
 * @see https://en.wikipedia.org/wiki/Web_colors#Hex_triplet
 */
export class RGBTOHEXConverter implements IConverter<IRGBColor, IHEXColor> {
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
    convert(from: IRGBColor): IHEXColor {
        const rHex = this.toHEX(from.value.r);
        const gHex = this.toHEX(from.value.g);
        const bHex = this.toHEX(from.value.b);
        const hex = `#${rHex}${gHex}${bHex}`;
        return { format: 'HEX', value: { hex }, a: from.a } as IHEXColor;
    }

    private toHEX(value: number): string {
        if (value < 0 || value > 255 || isNaN(value)) {
            throw new Error("RGB component must be between 0 and 255");
        }
        const hex = value.toString(16).toUpperCase();
        return hex.length === 1 ? `0${hex}` : hex;
    }
}
