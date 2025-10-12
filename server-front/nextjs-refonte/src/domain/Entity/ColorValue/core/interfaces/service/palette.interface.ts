/**
 * Interface pour une palette de couleurs simple.
 * Représente une collection nommée de couleurs au format HEX.
 * 
 * @interface IColorPalette
 * 
 * @example
 * ```typescript
 * const palette: IColorPalette = {
 *   name: "Sunset Colors",
 *   colors: ["#ff6b35", "#f7931e", "#ffd23f", "#06ffa5"]
 * };
 * ```
 */
export interface IColorPalette {
    /** Nom descriptif de la palette */
    name: string;
    /** Tableau de couleurs au format HEX */
    colors: string[];
}
