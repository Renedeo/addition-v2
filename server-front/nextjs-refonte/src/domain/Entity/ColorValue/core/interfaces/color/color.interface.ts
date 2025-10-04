import { ColorFormat, HEXColorValue, HSLColorValue, RGBColorValue } from "@domain/ColorValue/core/types/colorRepresention.types";

/**
 * Interface de base pour une couleur
 * Chaque format de couleur (RGB, HEX, HSL) implémente cette interface
 * Cela permet de garantir que toutes les couleurs ont une structure commune
 * 
 * @property {ColorFormat} format - Le format de la couleur (RGB, HEX, HSL)
 * @property {unknown} value - La valeur de la couleur, spécifique au format
 * @method {() => string} stringValue() - Méthode pour obtenir la représentation en chaîne de la couleur
*/
export abstract class IColor {
    /**
     * @see 
     * {@link ColorFormat}
     */
    abstract format: ColorFormat;
    /**
     * @see 
     * {@link HEXColorValue}, 
     * {@link RGBColorValue}, 
     * {@link HSLColorValue}
     */
    abstract value: unknown; // Valeur spécifique au format
    
    /**
     * Méthode pour obtenir la représentation en chaîne de la couleur
     * @returns {string} La représentation en chaîne de la couleur
     */
    abstract stringValue(): string; // Méthode pour obtenir la représentation en chaîne
}


/**
 * Interface pour une couleur au format HEX
 * Hérite de l'interface de base IColor
 * 
 * @see {@link IColor}
 */
export interface IHEXColor extends IColor {
    value: HEXColorValue; // Valeur HEX
}

/**
 * Interface pour une couleur au format RGB
 * Hérite de l'interface de base IColor
 * 
 * @see {@link IColor}
 */
export interface IRGBColor extends IColor {
    value: RGBColorValue; // Valeur RGB
}

/**
 * Interface pour une couleur au format HSL
 * Hérite de l'interface de base IColor
 * 
 * @see {@link IColor}
 */
export interface IHSLColor extends IColor {
    value: HSLColorValue; // Valeur HSL
}
