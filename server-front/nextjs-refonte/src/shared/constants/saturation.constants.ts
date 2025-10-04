/**
 * Données de saturation partagées.
 * Constantes pour l'analyse des niveaux de saturation HSL.
 */

/**
 * Table de correspondance pour l'analyse de la saturation d'une couleur HSL.
 * Permet de déterminer le niveau et la description en fonction du pourcentage de saturation.
 *
 * Niveaux :
 * - 0% : désaturé (gris)
 * - 1-30% : faible (pastel, doux)
 * - 31-60% : équilibré (naturel)
 * - 61-85% : élevé (vif, intense)
 * - 86-100% : pur (très intense, parfois artificiel)
 *
 * Utilisation :
 * ```typescript
 * const info = SATURATION_LEVELS.find(i => s >= i.min && s <= i.max);
 * ```
 */
export const SATURATION_LEVELS = [
    {
        level: "desaturated",
        min: 0,
        max: 0,
        description: "Color completely desaturated, appears as a shade of gray."
    },
    {
        level: "low",
        min: 0,
        max: 30,
        description: "Low Saturation, pastel shades, close to gray."
    },
    {
        level: "balanced",
        min: 30,
        max: 60,
        description: "Medium Saturation, balanced and natural colors."
    },
    {
        level: "high",
        min: 60,
        max: 85,
        description: "High Saturation, vivid, intense and dynamic colors."
    },
    {
        level: "pure",
        min: 85,
        max: 100,
        description: "Maximum Saturation, pure, very intense colors, sometimes artificial."
    }
] as const;

/**
 * Type pour les niveaux de saturation.
 */
export type SaturationLevel = typeof SATURATION_LEVELS[number]['level'];

/**
 * Interface pour les informations de saturation.
 */
export interface SaturationInfo {
    level: SaturationLevel;
    min: number;
    max: number;
    description: string;
}