/**
 * 🎯 Types pour les Composants de Test Color
 * 
 * Types partagés pour les mini-composants de test interactif
 */

import type { Color } from '@/theme/domain/valueObjects/Color/types';

/**
 * Props pour le sélecteur de couleur
 */
export interface ColorPickerProps {
  selectedColor: Color;
  selectedHex: string;
  onColorChange: (hex: string, color: Color) => void;
  label?: string;
  presetColors?: string[];
}

/**
 * Props pour les informations de couleur
 */
export interface ColorInfoProps {
  color: Color;
  showDetails?: boolean;
}

/**
 * Props pour les variations de couleur
 */
export interface ColorVariationsProps {
  baseColor: Color;
}

/**
 * Props pour le testeur d'accessibilité
 */
export interface AccessibilityTesterProps {
  primaryColor: Color;
  comparisonColor: Color;
  onComparisonColorChange: (hex: string, color: Color) => void;
}

/**
 * Variation de couleur pour l'affichage
 */
export interface ColorVariation {
  color: Color;
  label: string;
}