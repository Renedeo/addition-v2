/**
 * 🎨 ColorVariations - Affichage des Variations de Couleur
 * 
 * Composant pour générer et afficher les variations automatiques d'une couleur
 */

import React from 'react';
import type { ColorVariationsProps, ColorVariation } from '../types';

const ColorVariations: React.FC<ColorVariationsProps> = ({ baseColor }) => {
  // Génération des variations dynamiques
  const variations: ColorVariation[] = [
    { color: baseColor, label: 'Original' },
    { color: baseColor.lighten(0.1), label: '+10% Clair' },
    { color: baseColor.lighten(0.2), label: '+20% Clair' },
    { color: baseColor.darken(0.1), label: '+10% Sombre' },
    { color: baseColor.darken(0.2), label: '+20% Sombre' },
    { color: baseColor.withAlpha(0.7), label: 'Alpha 70%' },
    { color: baseColor.withAlpha(0.5), label: 'Alpha 50%' },
    { color: baseColor.withAlpha(0.3), label: 'Alpha 30%' }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🎨 Variations Dynamiques</h2>
      <p className="text-gray-600 mb-4">
        Variations automatiques basées sur votre couleur sélectionnée
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {variations.map((item, index) => (
          <div 
            key={index}
            style={{
              backgroundColor: item.color.toString(),
              color: item.color.isLight() ? '#000' : '#fff'
            }}
            className="p-3 rounded-md text-center text-sm"
          >
            <div className="font-medium mb-1">{item.label}</div>
            <div className="text-xs opacity-90">{item.color.toString()}</div>
            <div className="text-xs opacity-75 mt-1">
              L: {item.color.getLuminance().toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorVariations;