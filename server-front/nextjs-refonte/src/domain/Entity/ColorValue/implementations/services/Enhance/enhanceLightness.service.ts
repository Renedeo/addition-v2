
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IHSLColor, IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";

/**
 * Service d'amélioration de la luminosité d'une couleur.
 * Utilise le format HSL pour augmenter ou diminuer la valeur de lightness.
 *
 * Exemple d'utilisation :
 * ```typescript
 * const service = new EnhancedLightnessService(formatHandler);
 * const lighterColor = service.enhanceColor(color, 10); // +10% lightness
 * ```
 */
export class EnhancedLightnessService implements IEnhancedColorService {
    constructor(private colorFormatter: IColorFormatHandler) { }

    /**
     * Modifie la luminosité d'une couleur (HSL) de 'amount' points.
     * @param color Couleur à modifier
     * @param amount Valeur à ajouter à la luminosité (peut être négatif)
     * @returns Nouvelle couleur avec luminosité modifiée
     */
    enhanceColor(color: IColor, amount: number): IColor {
        // Conversion en HSL
        const preferredFormat: IHSLColor = this.colorFormatter.formatColor(color, FormatConst.HSL) as IHSLColor;
        const lightness = preferredFormat.value.l;
        // Modification de la luminosité (bornée entre 0 et 100)
        preferredFormat.value.l = Math.min(100, Math.max(0, lightness + amount));
        // Retour au format original
        return this.colorFormatter.toOriginalFormat(color, preferredFormat);
    }
}