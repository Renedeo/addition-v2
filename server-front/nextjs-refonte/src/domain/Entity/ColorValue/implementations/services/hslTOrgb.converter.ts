import { HSLColor, RGBColor } from "../../core/interfaces/color/color.interface";
import { IConverter } from "../../core/interfaces/service/converter.interface";

/**
 * class
 */
export class HSLTORGBConverter implements IConverter<HSLColor, RGBColor> {
    /**
     * Convert an HSL color value to its equivalent RGB representation.
     * The conversion process involves:
     * - Normalizing the HSL values to a range of 0 to 1.
     * - Calculating the RGB components based on the hue, saturation, and lightness values.
     * - If the saturation is zero, the color is a shade of gray, and all RGB components are equal to the lightness value.
     * - If the saturation is not zero, the RGB components are calculated using an intermediate function `hueToRGB` which adjusts the hue to derive the red, green, and blue values.
     * 
     * @param from - The HSL color to convert, including its alpha channel.
     * @returns The equivalent RGB color, including the alpha channel.
     */
    convert(from: HSLColor): RGBColor {
        const h = from.value.h / 360; // Normalizing the hue
        const s = from.value.s / 100; // Normalizing the saturation
        const l = from.value.l / 100; // Normalizing the lightness
        let r: number, g: number, b: number;

        // If the saturation is not zero, calculate the RGB components
        if (s !== 0) {
            // q represents the adjusted lightness
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            // p represents the inverse adjusted lightness
            const p = 2 * l - q;

            r = hueToRGB(p, q, h + 1 / 3);
            g = hueToRGB(p, q, h);
            b = hueToRGB(p, q, h - 1 / 3);
            return { format: 'RGB', value: { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }, a: from.a };
        }

        // If the saturation is zero, the color is gray
        r = g = b = Math.round(l * 255); // Achromatic (gray)
        return { format: 'RGB', value: { r, g, b }, a: from.a };
    }
}
/**
 * Converts a hue value to an RGB value.
 * The `hueToRGB` function is an intermediate step in converting
 * an HSL color to RGB. It calculates the RGB value for a given
 * component of the color.
 *
 * @param p - The red component.
 * @param q - The green component.
 * @param t - The blue component.
 * @returns The corresponding RGB value.
 */
function hueToRGB(p: number, q: number, t: number): number {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}