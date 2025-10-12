/**
 * Interfaces pour la génération de palettes de couleurs.
 * 
 * Ce module contient toutes les interfaces et types nécessaires
 * pour implémenter des générateurs de palettes de couleurs.
 */

export { PaletteInterface } from './palette.interface';
export type { 
  IPaletteService, 
  PaletteType, 
  PaletteConfig, 
  PaletteResult 
} from './palette-service.interface';

/**
 * Types utilitaires pour les palettes.
 */
export type PaletteColor = {
  /** Couleur */
  color: import('../color.interface').IColor;
  /** Position dans la palette (0-1) */
  position: number;
  /** Métadonnées optionnelles */
  metadata?: Record<string, unknown>;
};

export type PaletteDirection = 'lighter' | 'darker' | 'more-saturated' | 'less-saturated';