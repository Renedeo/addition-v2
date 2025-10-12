import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

/**
 * Interface abstraite pour la génération de palettes de couleurs.
 * Classe de base pour tous les générateurs de palettes (darken, lighten, saturate, etc.).
 * 
 * @abstract
 * @example
 * ```typescript
 * class DarkenPalette extends PaletteInterface {
 *   name = "darken";
 *   
 *   protected calculateColor(amount: number): IColor {
 *     // Logique pour assombrir la couleur
 *     return darkenedColor;
 *   }
 * }
 * ```
 */
export abstract class PaletteInterface {
    /** Nom du type de palette (darken, lighten, saturate, etc.) */
    abstract name: string;
    
    /** Couleur de base utilisée pour générer la palette */
    baseColor: IColor;

    /**
     * Constructeur de la palette.
     * @param baseColor - Couleur de base pour générer la palette
     */
    constructor(baseColor: IColor) {
        this.baseColor = baseColor;
    }

    /**
     * Méthode abstraite pour calculer une couleur modifiée.
     * Doit être implémentée par les classes dérivées.
     * 
     * @param amount - Quantité de modification à appliquer (optionnelle)
     * @returns Couleur modifiée selon l'algorithme spécifique
     */
    protected abstract calculateColor(amount?: number): IColor;

    /**
     * Génère une palette de couleurs basée sur la couleur de base.
     * Utilise la méthode calculateColor pour créer des variations.
     * 
     * @param numberOfColors - Nombre de couleurs à générer dans la palette
     * @returns Tableau de couleurs formant la palette
     * 
     * @example
     * ```typescript
     * const palette = paletteGenerator.generatePalette(10);
     * // Retourne un tableau de 10 couleurs
     * ```
     */
    generatePalette(numberOfColors: number): IColor[] {
        const palette: IColor[] = [];
        for (let i = 0; i < numberOfColors; i++) {
            try {
                const newColor = this.calculateColor(i * 10);
                palette.push(newColor);
            }
            catch {
                break;
            }
        }
        return palette;
    }
}