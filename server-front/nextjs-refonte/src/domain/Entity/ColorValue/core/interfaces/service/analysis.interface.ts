import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

/**
 * Generic interface for color analysis services.
 * TOutput represents the type of the analysis result.
 */
export interface IColorAnalysisService<TOutput> {
    analyzeColor(color: IColor): TOutput;
}


/**
 * Specialized interface for color analysis services that require two colors for comparison.
 * FGColor represents the type of the foreground color.
 * BGColor represents the type of the background color.
 * TOutput represents the type of the comparison result.
 */
export interface IColorComparisonService<FGColor, BGColor, TOutput> {
    compareColors(color1: FGColor, color2: BGColor): TOutput;
}


/**
 * Result interfaces for various color analyses.
 * Each interface defines the structure of the analysis result.
 */

/**
 * Result of color saturation analysis.
 * saturationLevel indicates the level of saturation.
 * description provides a textual description of the saturation level.
 * saturation (optional) provides the numerical saturation value if applicable.
 */
export interface IColorSaturationResult {
    saturationLevel: "desaturated" | "low" | "balanced" | "high" | "pure";
    description: string;
    saturation?: number;
}

/**
 * Result of color lightness analysis.
 * lightnessLevel indicates whether the color is dark or light.
 * description provides a textual description of the lightness level.
 * lightness provides the numerical lightness value.
 */
export interface IColorLightnessResult {
    lightnessLevel: "Dark" | "Light";
    description: string;
    lightness: number;
}

/**
 * Result of color contrast analysis.
 * contrastRatio indicates the contrast ratio between two colors.
 * isAccessible indicates whether the contrast meets accessibility standards for normal and large text.
 * level indicates the WCAG level achieved for normal and large text.
 * description provides a textual description of the contrast analysis.
 */
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

/**
 * Result of color shade relation analysis.
 * relation indicates the type of shade relation (e.g., analogous, complementary).
 * description provides a textual description of the shade relation.
 * angleDifference (optional) provides the angle difference in degrees if applicable.
 */
export interface IColorShadeRelationResult {
    relation: "analogous" | "complementary" | "triadic" | "tetradic" | "none";
    description: string;
    angleDifference?: number; // Angle difference in degrees
}