
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IColor, IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorAnalysisService, IColorComparisonService, IColorContrastResult, IColorLightnessResult } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";

/**
 * Service de comparaison de contraste entre deux couleurs selon WCAG.
 * Calcule le ratio de contraste et détermine le niveau d'accessibilité (AA/AAA) pour texte normal et large.
 *
 * Exemple d'utilisation :
 * ```typescript
 * const service = new ColorContrastService(formatHandler, lightnessService);
 * const result = service.compareColors(color1, color2);
 * console.log(result.contrastRatio); // Ratio numérique
 * ```
 */
export class ColorContrastService implements IColorComparisonService<IColor, IColor, IColorContrastResult> {
    constructor(private colorFormatter: IColorFormatHandler, private lightnessService: IColorAnalysisService<IColorLightnessResult>) {}

    /**
     * Compare deux couleurs et retourne le ratio de contraste et les niveaux d'accessibilité.
     * @param color1 Couleur de premier plan
     * @param color2 Couleur d'arrière-plan
     * @returns Résultat du contraste (ratio, niveaux, accessibilité)
     */
    compareColors(color1: IColor, color2: IColor): IColorContrastResult {
        // Conversion en RGB
        const rgbColor1 = this.colorFormatter.formatColor(color1, FormatConst.RGB) as IRGBColor;
        const rgbColor2 = this.colorFormatter.formatColor(color2, FormatConst.RGB) as IRGBColor;

        // Calcul du ratio de contraste
        const contrastRatio = this.calculateContrastRatio(rgbColor1, rgbColor2);

        // Texte normal : AA >= 4.5, AAA >= 7
        const isAccessible = contrastRatio >= 4.5;
        const normalTextLevel = contrastRatio >= 7 ? "AAA" : contrastRatio >= 4.5 ? "AA" : "Fail";

        // Texte large : AA >= 3, AAA >= 4.5
        const isLargeTextAccessible = contrastRatio >= 3;
        const largeTextLevel = contrastRatio >= 4.5 ? "AAA" : contrastRatio >= 3 ? "AA" : "Fail";

        return {
            contrastRatio,
            isAccessible: {
                normalText: isAccessible,
                largeText: isLargeTextAccessible
            },
            level: {
                normalText: normalTextLevel,
                largeText: largeTextLevel
            },
            description: "Contrast ratio calculated according to WCAG guidelines."
        };
    }

    /**
     * Calcule le ratio de contraste entre deux couleurs RGB.
     * @param foregroundColor Couleur de texte
     * @param backgroundColor Couleur de fond
     * @returns Ratio de contraste
     */
    private calculateContrastRatio(foregroundColor: IRGBColor, backgroundColor: IRGBColor): number {
        const luminance1 = this.lightnessService.analyzeColor(foregroundColor).lightness + 0.05;
        const luminance2 = this.lightnessService.analyzeColor(backgroundColor).lightness + 0.05;

        return luminance1 > luminance2
            ? luminance1 / luminance2
            : luminance2 / luminance1;
    }

    /**
     * Retourne les formats supportés par le service.
     */
    supportedFormats(): ColorFormat[] {
        return Object.values(FormatConst);
    }
}