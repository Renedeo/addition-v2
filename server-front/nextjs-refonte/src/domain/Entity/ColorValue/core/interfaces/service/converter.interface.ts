// Nous allons utiliser le registry/Strategy pattern
// pour permettre la conversion entre différents formats de couleurs
// sans créer de dépendances directes entre les classes de couleur.

import { ColorFormat } from "../../types/colorRepresention.types";
import { IColor } from "../color/color.interface";

/**
 * Interface pour un service de conversion entre deux types.
 * 
 * **Types génériques :**
 * - `From` : Le type source à convertir  
 * - `To` : Le type cible après conversion
 *
 * **Exemple d'implémentation :**
 * ```typescript
 * class RGBToHSLConverter implements IConverter<RGBColor, HSLColor> {
 *     convert(from: RGBColor): HSLColor {
 *         // Logique de conversion ici
 *         return new HSLColor(h, s, l);
 *     }
 * }
 * ```
 */
export interface IConverter<From, To> {
    /**
     * Convertit une couleur du format source vers le format cible.
     * @param {From} from  La couleur source à convertir
     * @returns {To} La couleur convertie au format cible
     */
    convert(from: From): To;
}

export interface IConverterRegistry {
    register<From, To>(
        fromType: string,
        toType: string,
        converter: IConverter<From, To>
    ): void;

    get<From, To>(
        fromType: string,
        toType: string
    ): IConverter<From, To> | undefined;
}

export interface IConverterConfig {
    converters: Array<{
        fromType: ColorFormat;
        toType: ColorFormat;
        converter: IConverter<IColor, IColor>;
    }>;
}