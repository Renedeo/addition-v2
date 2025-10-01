import { IHSLColor, IRGBColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";

/**
 * Class responsible for converting RGB color values to HSL color values.
 * 
 * The RGB (Red, Green, Blue) color model is commonly used for digital displays,
 * while the HSL (Hue, Saturation, Lightness) color model is often preferred for
 * tasks involving color manipulation and design due to its more intuitive representation
 * of colors. This class facilitates the conversion between these two models.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 */
export class RGBToHSLConverter implements IConverter<IRGBColor, IHSLColor> {
    /**
     * Converts an RGB color value to its equivalent HSL representation.
     * 
     * The conversion process involves:
     * - Normalizing the RGB values to a range of 0 to 1.
     * - Calculating the maximum and minimum values among the normalized RGB components
     *   to determine the lightness (`l`) and the difference (`d`) for hue (`h`) and
     *   saturation (`s`) calculations.
     * - Computing the hue based on which RGB component is the maximum, ensuring the
     *   result is within the range of 0 to 360 degrees.
     * - Calculating the saturation as a percentage, depending on the lightness value.
     * 
     * This computation is essential for converting RGB to HSL because the two color
     * models represent colors differently. RGB defines colors in terms of additive
     * light, while HSL represents colors in terms of their hue, saturation, and lightness,
     * making it more suitable for tasks like color adjustments and user interface design.
     * 
     * @param from - The RGB color value to be converted, including its alpha channel.
     * @returns The equivalent HSL color value, including the alpha channel.
     */
    convert(from: IRGBColor): IHSLColor {
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

        return { format: 'HSL', value: { h: h * 360, s: s * 100, l: l * 100 }, a: from.a } as IHSLColor;
    }
}