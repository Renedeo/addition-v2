/**
 * 🎨 ColorPicker - Sélecteur de Couleur Interactif
 * 
 * Composant pour la sélection de couleur avec picker HTML5 et couleurs prédéfinies
 */

import React from 'react';
import type { ColorPickerProps } from '../types';

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  selectedHex,
  onColorChange,
  label = 'Couleur Principale',
  presetColors = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12', 
    '#9b59b6', '#95a5a6', '#34495e', '#e67e22'
  ]
}) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hex = event.target.value;
    try {
      const { createColorFromHex } = require('@/theme/domain/valueObjects/Color');
      const color = createColorFromHex(hex);
      onColorChange(hex, color);
    } catch (error) {
      console.error('Erreur couleur:', error);
    }
  };

  const handlePresetClick = (hex: string) => {
    try {
      const { createColorFromHex } = require('@/theme/domain/valueObjects/Color');
      const color = createColorFromHex(hex);
      onColorChange(hex, color);
    } catch (error) {
      console.error('Erreur couleur prédéfinie:', error);
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-3">{label}</h3>
      
      {/* Sélecteur principal */}
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="color"
          value={selectedHex}
          onChange={handleColorChange}
          className="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer"
        />
        <div>
          <p className="font-medium">{selectedColor.toString()}</p>
          <p className="text-sm text-gray-600">
            RGB: {selectedColor.toRgb().r}, {selectedColor.toRgb().g}, {selectedColor.toRgb().b}
          </p>
          <p className="text-sm text-gray-600">
            HSL: {selectedColor.toHsl().h}°, {selectedColor.toHsl().s}%, {selectedColor.toHsl().l}%
          </p>
        </div>
      </div>

      {/* Couleurs prédéfinies */}
      <div>
        <p className="text-sm font-medium mb-2">Couleurs prédéfinies :</p>
        <div className="flex flex-wrap gap-2">
          {presetColors.map((hex) => (
            <button
              key={hex}
              onClick={() => handlePresetClick(hex)}
              style={{ backgroundColor: hex }}
              className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500 transition-colors"
              title={hex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;