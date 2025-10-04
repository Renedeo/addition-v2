
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IColor, IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorAnalysisService, IColorComparisonService, IColorContrastResult, IColorLightnessResult } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";
import { ACCESSIBILITY_THRESHOLDS } from "@/shared/constants/accessibility.constants";

/**
 * Service de comparaison de contraste entre deux couleurs selon WCAG.
 * Calcule le ratio de contraste et détermine le niveau d'accessibilité (AA/AAA) pour texte normal et large.
 *
 * Exemple d'utilisation :
 * ```typescript
 * import { ColorFormatService } from '@/shared/services/colorFormat.service';
 * import { LightnessService } from '../colorAnalysis/lightness.service';
 * 
 * const formatService = new ColorFormatService(conversionService);
 * const lightnessService = new LightnessService(formatService);
 * const service = new ColorContrastService(formatService, lightnessService);
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

        // Texte normal : évaluation selon WCAG
        const isAccessible = contrastRatio >= ACCESSIBILITY_THRESHOLDS.NORMAL_TEXT.AA_THRESHOLD;
        const normalTextLevel = contrastRatio >= ACCESSIBILITY_THRESHOLDS.NORMAL_TEXT.AAA_THRESHOLD 
            ? ACCESSIBILITY_THRESHOLDS.LEVELS.AAA 
            : contrastRatio >= ACCESSIBILITY_THRESHOLDS.NORMAL_TEXT.AA_THRESHOLD 
                ? ACCESSIBILITY_THRESHOLDS.LEVELS.AA 
                : ACCESSIBILITY_THRESHOLDS.LEVELS.FAIL;

        // Texte large : évaluation selon WCAG
        const isLargeTextAccessible = contrastRatio >= ACCESSIBILITY_THRESHOLDS.LARGE_TEXT.AA_THRESHOLD;
        const largeTextLevel = contrastRatio >= ACCESSIBILITY_THRESHOLDS.LARGE_TEXT.AAA_THRESHOLD 
            ? ACCESSIBILITY_THRESHOLDS.LEVELS.AAA 
            : contrastRatio >= ACCESSIBILITY_THRESHOLDS.LARGE_TEXT.AA_THRESHOLD 
                ? ACCESSIBILITY_THRESHOLDS.LEVELS.AA 
                : ACCESSIBILITY_THRESHOLDS.LEVELS.FAIL;

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
     * Formule WCAG 2.1 : (L1 + 0.05) / (L2 + 0.05)
     * où L1 est la luminance relative de la couleur la plus claire
     * et L2 est la luminance relative de la couleur la plus sombre
     * @param foregroundColor Couleur de texte
     * @param backgroundColor Couleur de fond
     * @returns Ratio de contraste selon WCAG
     */
    private calculateContrastRatio(foregroundColor: IRGBColor, backgroundColor: IRGBColor): number {
        // Récupération des luminances relatives (0-100) et normalisation (0-1)
        const luminance1 = this.lightnessService.analyzeColor(foregroundColor).lightness / 100;
        const luminance2 = this.lightnessService.analyzeColor(backgroundColor).lightness / 100;
        
        // Application de la formule WCAG : (L1 + 0.05) / (L2 + 0.05)
        // où L1 >= L2
        const l1 = luminance1 + 0.05;
        const l2 = luminance2 + 0.05;
        
        return l1 > l2 ? l1 / l2 : l2 / l1;
    }

    /**
     * Retourne les formats supportés par le service.
     */
    supportedFormats(): ColorFormat[] {
        return Object.values(FormatConst);
    }
}