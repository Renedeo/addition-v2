import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";
import { IColor } from "@domain/ColorValue/core/interfaces/color/color.interface";

export interface IColorAnalysisService<IInput, TOutput> {
    analyzeColor(color: IInput): TOutput;
    preferredFormat(color:IColor): IColor;
    supportedFormats(): ColorFormat[];
}

export interface IColorSaturationResult {
    saturationLevel: string;
    description: string;
    saturation?: number;
}

export interface IColorLightnessResult {
    lightnessLevel: "Dark" | "Light";
    description: string;
    lightness?: number;
}