import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";
import { IColorConversionService } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/colorConversion.service";

/**
 * Service de formatage de couleurs partagé.
 * Utilise le service de conversion pour formatter les couleurs entre différents formats.
 * Fournit également la conversion retour vers le format original.
 *
 * Exemple d'utilisation :
 * ```typescript
 * const formatter = new IFormatter(conversionService);
 * const rgbColor = formatter.formatColor(hexColor, FormatConst.RGB);
 * const originalColor = formatter.toOriginalFormat(hexColor, modifiedRgbColor);
 * ```
 */
export class IFormatter implements IColorFormatHandler {
    constructor(private conversionService:IColorConversionService) {}
    
    /**
     * Formate une couleur vers le format spécifié.
     * @param color Couleur à formater
     * @param to Format cible
     * @returns Couleur formatée
     */
    formatColor(color:IColor, to:ColorFormat): IColor {
        const conversionService = this.conversionService;
        const colorResult = conversionService.convert<IColor, IColor>(color, color.format, to);
        return colorResult;
    }

    /**
     * Retourne la liste des formats supportés.
     */
    supportedFormats(): string[] {
       return this.conversionService.getSupportedFormats();
    }

    /**
     * Convertit une couleur modifiée vers le format original.
     * @param color Couleur originale (pour référence du format)
     * @param modifiedColor Couleur modifiée à convertir
     * @returns Couleur dans le format original
     */
    toOriginalFormat(color: IColor, modifiedColor: IColor): IColor {
        if (color.format === modifiedColor.format) return modifiedColor;
        const originalColor = this.conversionService.convert<IColor, IColor>(modifiedColor, modifiedColor.format, color.format);
        return originalColor;
    }
}


