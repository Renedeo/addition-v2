// Nous allons utiliser le registry/Strategy pattern
// pour permettre la conversion entre différents formats de couleurs
// sans créer de dépendances directes entre les classes de couleur.

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