import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

/**
 * Interface pour les services d'amélioration de couleurs.
 * Permet de modifier les propriétés d'une couleur (luminosité, saturation, etc.).
 * 
 * @interface IEnhancedColorService
 * 
 * @example
 * ```typescript
 * class SaturationEnhancer implements IEnhancedColorService {
 *   enhanceColor(color: IColor, amount: number): IColor {
 *     // Augmente la saturation de la couleur
 *     return enhancedColor;
 *   }
 * }
 * ```
 */
export interface IEnhancedColorService {
    /**
     * Améliore une couleur selon les paramètres fournis.
     * La nature de l'amélioration dépend de l'implémentation spécifique
     * (luminosité, saturation, contraste, etc.).
     * 
     * @param color - Couleur de base à améliorer
     * @param args - Arguments variables selon le type d'amélioration
     * @returns Couleur améliorée
     * 
     * @example
     * ```typescript
     * const enhanced = service.enhanceColor(originalColor, 20); // Augmente de 20%
     * ```
     */
    enhanceColor(color: IColor, ...args:unknown[]): IColor;
}