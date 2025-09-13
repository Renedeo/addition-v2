'use client';

/**
 * 🧪 ColorTestComponent - Orchestrateur de Tests Interactifs
 * 
 * Composant principal orchestrant les mini-composants de test du Value Object Color
 */

import React, { useState } from 'react';
import type { Color } from '@/theme/domain/valueObjects/Color/types';
import { createColorFromHex } from '@/theme/domain/valueObjects/Color';

// Import des mini-composants
import {
  ColorPicker,
  ColorInfo,
  ColorVariations,
  AccessibilityTester
} from './index';

const ColorTestComponent: React.FC = () => {
  // États pour les couleurs
  const [selectedColor, setSelectedColor] = useState<Color>(createColorFromHex('#3498db'));
  const [selectedHex, setSelectedHex] = useState('#3498db');
  const [comparisonColor, setComparisonColor] = useState<Color>(createColorFromHex('#ffffff'));
  const [comparisonHex, setComparisonHex] = useState('#ffffff');

  // Gestionnaires d'événements
  const handleColorChange = (hex: string, color: Color) => {
    setSelectedHex(hex);
    setSelectedColor(color);
  };

  const handleComparisonColorChange = (hex: string, color: Color) => {
    setComparisonHex(hex);
    setComparisonColor(color);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🎨 Test Interactif - Value Object Color
        </h1>
        <p className="text-gray-600">
          Interface modulaire pour tester le Value Object Color
        </p>
      </header>

      {/* Section de sélection de couleur */}
      <section>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">🎯 Sélection de Couleur</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sélecteur de couleur */}
            <ColorPicker
              selectedColor={selectedColor}
              selectedHex={selectedHex}
              onColorChange={handleColorChange}
            />

            {/* Informations sur la couleur */}
            <ColorInfo 
              color={selectedColor}
              showDetails={true}
            />
          </div>
        </div>
      </section>

      {/* Section des tests d'accessibilité */}
      <section>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <AccessibilityTester
            primaryColor={selectedColor}
            comparisonColor={comparisonColor}
            onComparisonColorChange={handleComparisonColorChange}
          />
        </div>
      </section>

      {/* Section des variations dynamiques */}
      <section>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ColorVariations baseColor={selectedColor} />
        </div>
      </section>

      {/* Validation de l'architecture modulaire */}
      <section>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            ✅ Architecture Modulaire Validée
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <ul className="space-y-1">
              <li>✅ Composants modulaires séparés</li>
              <li>✅ Logique métier isolée</li>
              <li>✅ Props typées avec TypeScript</li>
              <li>✅ Réutilisabilité maximale</li>
            </ul>
            <ul className="space-y-1">
              <li>✅ Interface cohérente</li>
              <li>✅ Performance optimisée</li>
              <li>✅ Maintenance facilitée</li>
              <li>✅ Tests unitaires possibles</li>
            </ul>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-sm text-blue-600">
              <strong>Mini-composants utilisés :</strong> ColorPicker, ColorInfo, ColorVariations, AccessibilityTester
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColorTestComponent;