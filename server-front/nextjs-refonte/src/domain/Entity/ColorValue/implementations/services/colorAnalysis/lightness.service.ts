
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IColor, IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorAnalysisService, IColorLightnessResult, } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";

/**
 * Service d'analyse de la luminosité d'une couleur.
 * Utilise le format RGB et la formule Rec. 709 pour calculer la luminance relative.
 *
 * Exemple d'utilisation :
 * ```typescript
 * const service = new LightnessService(formatHandler);
 * const result = service.analyzeColor(color);
 * console.log(result.lightnessLevel); // "Light" ou "Dark"
 * ```
 */
export class LightnessService implements IColorAnalysisService<IColorLightnessResult> {
    constructor(private colorFormatter: IColorFormatHandler) {}

    /**
     * Analyse la luminosité d'une couleur selon la perception humaine.
     * @param color Couleur à analyser
     * @returns Résultat contenant le niveau, la description et la valeur de luminosité
     */
    analyzeColor(color: IColor): IColorLightnessResult {
        // Conversion en RGB
        const rgbColor = this.colorFormatter.formatColor(color, FormatConst.RGB) as IRGBColor;
        // Calcul de la luminance relative (Rec. 709)
        // Y = 0.2126*R + 0.7152*G + 0.0722*B
        // R, G, B dans [0, 1]
        const rNorm = rgbColor.value.r / 255;
        const gNorm = rgbColor.value.g / 255;
        const bNorm = rgbColor.value.b / 255;

        // Correction gamma
        const coeff = (value: number) => {
            return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        }
        const r = coeff(rNorm);
        const g = coeff(gNorm);
        const b = coeff(bNorm);

        const lightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return {
            lightnessLevel: lightness < 0.5 ? "Dark" : "Light",
            description: lightness < 0.5 ? "The color is perceived as dark." : "The color is perceived as light.",
            lightness: (lightness * 100),
        };
    }
}