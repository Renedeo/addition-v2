
import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";

/**
 * Interface pour un gestionnaire de format de couleur.
 * Permet de convertir une couleur vers un format cible, lister les formats supportés et revenir au format original.
 */
export interface IColorFormatHandler {
    /**
     * Convertit une couleur vers un format cible.
     * @param color Couleur source
     * @param to Format cible
     * @returns Couleur convertie
     */
    formatColor(color: IColor, to: ColorFormat): IColor;

    /**
     * Liste les formats supportés par le gestionnaire.
     */
    supportedFormats(): string[];

    /**
     * Convertit une couleur modifiée vers son format original.
     * @param color Couleur originale
     * @param modifiedColor Couleur modifiée
     * @returns Couleur dans le format original
     */
    toOriginalFormat(color: IColor, modifiedColor: IColor): IColor;
}
