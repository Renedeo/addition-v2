
// Utilisation du registry/Strategy pattern pour la conversion entre formats de couleurs sans dépendances directes.
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";

/**
 * Interface pour vérifier la capacité de conversion entre deux formats de couleur.
 * @export
 */
export interface IConversionCapabilityService {
    /**
     * Indique si la conversion directe entre deux formats est possible.
     * @param fromType Format source
     * @param toType Format cible
     * @returns True si la conversion est possible
     */
    canConvert(fromType: ColorFormat, toType: ColorFormat): boolean;
}

/**
 * Interface générique pour un convertisseur entre deux types de couleur.
 * @template From Type source
 * @template To Type cible
 *
 * Exemple d'implémentation :
 * ```typescript
 * class RGBToHSLConverter implements IConverter<RGBColor, HSLColor> {
 *     convert(from: RGBColor): HSLColor {
 *         // ...
 *     }
 * }
 * ```
 */
export interface IConverter<From, To> {
    /**
     * Convertit une couleur du format source vers le format cible.
     * @param from Couleur source
     * @returns Couleur convertie
     */
    convert(from: From): To;
}

/**
 * Interface pour un service de conversion directe entre deux formats.
 * Hérite de la capacité de conversion.
 */
export interface IDirectConversionService extends IConversionCapabilityService {
    /**
     * Convertit une couleur d'un format à un autre.
     * @param from Couleur source
     * @param fromType Format source
     * @param toType Format cible
     * @returns Couleur convertie
     */
    convert<From, To>(from: From, fromType: ColorFormat, toType: ColorFormat): To;
}

/**
 * Interface pour un service de conversion via un format intermédiaire.
 * Hérite de la capacité de conversion.
 */
export interface IIntermediateColorConversionService extends IConversionCapabilityService {
    /**
     * Convertit une couleur via un format intermédiaire (ex: HEX -> RGB -> HSL).
     * @param from Couleur source
     * @param fromType Format source
     * @param toType Format cible
     * @param intermediateType Format intermédiaire
     * @returns Couleur convertie
     */
    convertViaIntermediate<From, To>(from: From, fromType: ColorFormat, toType: ColorFormat, intermediateType: ColorFormat): To;
}
