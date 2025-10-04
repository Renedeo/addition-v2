/**
 * Constantes d'accessibilité selon les standards WCAG (Web Content Accessibility Guidelines).
 * Utilisées pour évaluer les ratios de contraste entre couleurs.
 * 
 * @example
 * ```typescript
 * import { ACCESSIBILITY_THRESHOLDS } from '@/shared/constants/accessibility.constants';
 * 
 * // Évaluation d'un ratio de contraste
 * const ratio = 4.8;
 * const isAACompliant = ratio >= ACCESSIBILITY_THRESHOLDS.NORMAL_TEXT.AA_THRESHOLD;
 * const level = ratio >= ACCESSIBILITY_THRESHOLDS.NORMAL_TEXT.AAA_THRESHOLD 
 *   ? ACCESSIBILITY_THRESHOLDS.LEVELS.AAA 
 *   : ACCESSIBILITY_THRESHOLDS.LEVELS.AA;
 * ```
 */

/**
 * Seuils de contraste WCAG pour le texte normal.
 */
export const WCAG_NORMAL_TEXT = {
  /** Seuil minimum pour le niveau AA (4.5:1) */
  AA_THRESHOLD: 4.5,
  /** Seuil minimum pour le niveau AAA (7:1) */
  AAA_THRESHOLD: 7
} as const;

/**
 * Seuils de contraste WCAG pour le texte large (18pt+ ou 14pt+ gras).
 */
export const WCAG_LARGE_TEXT = {
  /** Seuil minimum pour le niveau AA (3:1) */
  AA_THRESHOLD: 3,
  /** Seuil minimum pour le niveau AAA (4.5:1) */
  AAA_THRESHOLD: 4.5
} as const;

/**
 * Niveaux de conformité WCAG.
 */
export const WCAG_LEVELS = {
  /** Échec - Ne respecte pas les standards minimums */
  FAIL: "Fail",
  /** Niveau AA - Conformité standard */
  AA: "AA", 
  /** Niveau AAA - Conformité renforcée */
  AAA: "AAA"
} as const;

/**
 * Type pour les niveaux WCAG.
 */
export type WCAGLevel = typeof WCAG_LEVELS[keyof typeof WCAG_LEVELS];

/**
 * Configuration complète des seuils d'accessibilité.
 */
export const ACCESSIBILITY_THRESHOLDS = {
  NORMAL_TEXT: WCAG_NORMAL_TEXT,
  LARGE_TEXT: WCAG_LARGE_TEXT,
  LEVELS: WCAG_LEVELS
} as const;