import { FormatConst } from "../constants/colorRepresentation.const";

export type ColorFormat = typeof FormatConst[keyof typeof FormatConst];

export type RGBColorValue = {r: number; g: number; b: number} 
export type HSLColorValue = {h: number; s: number; l: number} 
export type HEXColorValue = {hex: string}

// type ColorValue = RGBColorValue | HSLColorValue | HEXColorValue;
