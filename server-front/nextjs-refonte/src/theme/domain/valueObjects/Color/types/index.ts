/**
 * 🎯 Color Types - Barrel Exports
 * 
 * Point d'entrée unifié pour tous les types du domaine Color.
 * Ce fichier implémente le pattern Barrel Export pour fournir une API publique
 * contrôlée et optimisée.
 * 
 * ## Architecture Modulaire
 * - **Responsabilité**: API publique unifiée du module types
 * - **Principe**: Encapsulation et contrôle de l'exposition des types
 * - **Optimisation**: Exports type-only pour de meilleures performances
 * - **Simplicité**: Interface unifiée pour les consommateurs
 * 
 * ## Pattern Barrel Export
 * Le pattern Barrel Export offre plusieurs avantages :
 * - **API Centralisée**: Un seul point d'import pour tous les types
 * - **Encapsulation**: Contrôle de ce qui est exposé publiquement
 * - **Refactoring Sûr**: Changements internes sans impact sur les consommateurs
 * - **Tree Shaking**: Optimisation du bundle grâce aux exports sélectifs
 * 
 * ## Types Exportés
 * 
 * ### Types de Base (depuis ./base)
 * - Types primitifs : `ColorFormat`, `RGBValues`, `HSLValues`, etc.
 * - Types de configuration : `ColorOptions`, `ColorValidationResult`
 * - Classes d'erreur : `ColorDomainError`
 * 
 * ### Interfaces de Service (depuis ./interfaces)
 * - Interface principale : `Color`
 * - Contrats de service : `ColorValidator`, `ColorConverter`, etc.
 * 
 * ## Utilisation Recommandée
 * ```typescript
 * // ✅ Import depuis l'API publique
 * import type { ColorFormat, Color, ColorValidator } from '../types';
 * 
 * // ❌ Éviter les imports directs
 * import type { ColorFormat } from '../types/base';
 * ```
 * 
 * ## Optimisations TypeScript
 * - Utilisation de `type` pour les exports type-only
 * - Pas d'exports de valeurs runtime sauf pour les classes
 * - Support du tree-shaking natif
 * 
 * @module types
 * @version 1.0.0
 * @since 1.0.0
 * @author Theme System
 */

/**
 * Réexportation des types fondamentaux du domaine Color
 * @see {@link ./base} pour les définitions complètes
 */
export type {
  /** Union type des formats de couleur supportés */
  ColorFormat,
  /** Interface pour les valeurs RGB */
  RGBValues,
  /** Interface pour les valeurs RGBA */
  RGBAValues,
  /** Interface pour les valeurs HSL */
  HSLValues,
  /** Interface pour les valeurs HSLA */
  HSLAValues,
  /** Options de configuration pour Color */
  ColorOptions,
  /** Résultat de validation avec erreurs et avertissements */
  ColorValidationResult
} from './base';

/**
 * Classe d'erreur spécialisée pour le domaine Color
 * @see {@link ./base.ColorDomainError} pour la définition complète
 */
export { ColorDomainError } from './base';

/**
 * Réexportation des interfaces de service du domaine Color
 * @see {@link ./interfaces} pour les définitions complètes
 */
export type {
  /** Interface principale du Value Object Color */
  Color,
  /** Contrat pour la validation des formats de couleur */
  ColorValidator,
  /** Contrat pour les conversions entre formats */
  ColorConverter,
  /** Contrat pour les utilitaires d'accessibilité */
  ColorUtilities,
  /** Contrat pour la validation métier */
  ColorDomainValidator
} from './interfaces';