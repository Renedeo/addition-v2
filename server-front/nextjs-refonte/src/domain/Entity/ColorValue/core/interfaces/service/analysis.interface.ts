import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";
import { IColor } from "@domain/ColorValue/core/interfaces/color/color.interface";

export interface IColorAnalysisService<IInput, TOutput> {
    analyzeColor(color: IInput): TOutput;
    preferredFormat(color:IColor): IColor;
    supportedFormats(): ColorFormat[];
}

export interface IColorComparisonService<FGColor, BGColor, TOutput> {
    compareColors(color1: FGColor, color2: BGColor): TOutput;
    preferredFormat(color:IColor): IColor;
    supportedFormats(): ColorFormat[];
}

export interface IColorSaturationResult {
    saturationLevel: "desaturated" | "low" | "balanced" | "high" | "pure";
    description: string;
    saturation?: number;
}

export interface IColorLightnessResult {
    lightnessLevel: "Dark" | "Light";
    description: string;
    lightness: number;
}

export interface IColorContrastResult {
    contrastRatio: number;
    isAccessible: {
        normalText: boolean;
        largeText: boolean;
    };
    level: {
        normalText: "AAA" | "AA" | "Fail";
        largeText: "AAA" | "AA" | "Fail";
    }
    description: string;
}

