import { FormatConst } from "@domain/ColorValue/core/constants/colorRepresentation.const";
import { ColorFormat, HEXColorValue, HSLColorValue, RGBColorValue } from "@domain/ColorValue/core/types/colorRepresention.types";

interface ColorOpacity {
    a: number; // Opacité commune
}

export interface IColor {
    format: ColorFormat;
    value: unknown; // Valeur spécifique au format
    toString(): string; // Méthode pour obtenir la représentation en chaîne
}

export interface IColorWithAlpha extends IColor, ColorOpacity {}

export interface IHEXColor extends IColorWithAlpha {
    value: HEXColorValue; // Valeur HEX
}

export interface IRGBColor extends IColorWithAlpha {
    value: RGBColorValue; // Valeur RGB
}

export interface IHSLColor extends IColorWithAlpha {
    value: HSLColorValue; // Valeur HSL
}
