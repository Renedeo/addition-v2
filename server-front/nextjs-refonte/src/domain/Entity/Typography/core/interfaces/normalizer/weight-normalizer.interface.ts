import type { FontWeight } from "@domain/Entity/Typography/core/types/fontFamily.type";

/**
 * IWeightNormalizer
 * Responsabilité : normaliser les poids de police (label -> valeur numérique CSS 100..900).
 */
export interface IWeightNormalizer {
  normalizeWeight(weight: FontWeight): number;
}

export default IWeightNormalizer;
