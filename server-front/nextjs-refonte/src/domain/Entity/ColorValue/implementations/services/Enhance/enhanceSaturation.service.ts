
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IHSLColor, IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IEnhancedColorService } from "@/domain/Entity/ColorValue/core/interfaces/service/enhanced.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { clamp } from "@/shared/utils/format.utils";

/**
 * Service d'amélioration de la saturation d'une couleur.
 * Utilise le format HSL pour augmenter ou diminuer la valeur de saturation.
 *
 * Exemple d'utilisation :
 * ```typescript
 * import { ColorFormatService } from '@/shared/services/colorFormat.service';
 * 
 * const formatService = new ColorFormatService(conversionService);
 * const service = new EnhanceSaturationService(formatService);
 * const saturatedColor = service.enhanceColor(color, 15); // +15% saturation
 * ```
 */
export class EnhanceSaturationService implements IEnhancedColorService{
    constructor( private colorFormatter: IColorFormatHandler) {}

    /**
     * Modifie la saturation d'une couleur (HSL) de 'amount' points.
     * @param color Couleur à modifier
     * @param amount Valeur à ajouter à la saturation (peut être négatif)
     * @returns Nouvelle couleur avec saturation modifiée
     */
    enhanceColor(color: IColor, amount: number): IColor {
        // Conversion en HSL
        const preferredFormat: IHSLColor = this.colorFormatter.formatColor(color, FormatConst.HSL) as IHSLColor;
        const saturation = preferredFormat.value.s;
        // Modification de la saturation (bornée entre 0 et 100)
        preferredFormat.value.s = clamp(saturation + amount, 0, 100);
        // Retour au format original
        return this.colorFormatter.toOriginalFormat(color, preferredFormat);
    }
}