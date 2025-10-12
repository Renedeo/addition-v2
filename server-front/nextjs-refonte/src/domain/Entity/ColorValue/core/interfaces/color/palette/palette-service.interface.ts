import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

/**
 * Interface pour les services de génération de palettes.
 * Définit le contrat pour tous les générateurs de palettes.
 */
export interface IPaletteService {
  /** Nom du service de palette */
  readonly name: string;
  
  /** Couleur de base utilisée pour la génération */
  readonly baseColor: IColor;
  
  /**
   * Génère une palette de couleurs.
   * @param count - Nombre de couleurs à générer
   * @returns Tableau de couleurs formant la palette
   */
  generatePalette(count: number): IColor[];
  
  /**
   * Génère une couleur unique avec la quantité spécifiée.
   * @param amount - Quantité de modification à appliquer
   * @returns Couleur modifiée
   */
  generateColor(amount: number): IColor;
}

/**
 * Type union pour les différents types de palettes supportées.
 */
export type PaletteType = 'darken' | 'lighten' | 'saturate' | 'desaturate' | 'complementary' | 'analogous' | 'triadic';

/**
 * Configuration pour la génération de palette.
 */
export interface PaletteConfig {
  /** Type de palette à générer */
  type: PaletteType;
  /** Nombre de couleurs dans la palette */
  count: number;
  /** Intensité de la modification (0-100) */
  intensity?: number;
  /** Espacement entre les couleurs */
  step?: number;
}

/**
 * Résultat de génération de palette avec métadonnées.
 */
export interface PaletteResult {
  /** Type de palette générée */
  type: PaletteType;
  /** Couleur de base utilisée */
  baseColor: IColor;
  /** Couleurs de la palette */
  colors: IColor[];
  /** Métadonnées sur la génération */
  metadata: {
    /** Nombre de couleurs générées */
    count: number;
    /** Intensité utilisée */
    intensity: number;
    /** Espacement utilisé */
    step: number;
  };
}