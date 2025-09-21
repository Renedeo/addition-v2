import { FormatConst } from "@domain/ColorValue/core/constants/colorRepresentation.const";
import { ColorFormat, HEXColorValue, HSLColorValue, RGBColorValue } from "@domain/ColorValue/core/types/colorRepresention.types";

interface ColorOpacity {
    a: number; // Opacité commune
}

export interface IColor {
    format: ColorFormat;
    value: unknown; // Valeur spécifique au format
}

export interface IColorWithAlpha extends IColor, ColorOpacity {}

export interface HEXColor extends IColorWithAlpha {
    format: typeof FormatConst.HEX;
    value: HEXColorValue; // Valeur HEX
}

export interface RGBColor extends IColorWithAlpha {
    format: typeof FormatConst.RGB;
    value: RGBColorValue; // Valeur RGB
}

export interface HSLColor extends IColorWithAlpha {
    format: typeof FormatConst.HSL;
    value: HSLColorValue; // Valeur HSL
}
