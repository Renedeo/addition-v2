export interface IColorAnalysisService<IInput, TOutput> {
    analyzeColor(color: IInput): TOutput;
}

export interface IColorComparisonService<FGColor, BGColor, TOutput> {
    compareColors(color1: FGColor, color2: BGColor): TOutput;
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

export interface IColorShadeRelationResult {
    relation: "analogous" | "complementary" | "triadic" | "tetradic" | "none";
    description: string;
    angleDifference?: number; // Angle difference in degrees
}