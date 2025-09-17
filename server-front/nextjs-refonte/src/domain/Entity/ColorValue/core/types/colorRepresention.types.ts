import { ColorRepresentationConst, FormatConst } from "../constants/colorRepresentation.const";

export type ColorFormat = typeof FormatConst[keyof typeof FormatConst];

export type RGBColor = ColorRepresentationConst["RGB"];

export type HSLColor = ColorRepresentationConst["HSL"];

export type HEXColor = ColorRepresentationConst["HEX"];