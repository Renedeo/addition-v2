
"use client";
import { IColor, IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { HEXColor } from "@/domain/Entity/ColorValue/implementations/core/hex";
import React from "react";

/**
 * Composant de sélection et saisie d'une couleur HEX.
 * Permet à l'utilisateur de choisir une couleur via un input color ou de saisir le code HEX manuellement.
 * Gère la validation du format HEX et affiche un message d'erreur si le code est invalide.
 *
 * Props :
 * - onColorChange : Callback appelé avec la nouvelle couleur (IHEXColor) lors de la sélection ou saisie
 * - label : Label affiché au-dessus du sélecteur
 * - value : Couleur actuellement sélectionnée (IColor)
 */
export interface ColorSelectionProps {
  onColorChange: (color: IHEXColor) => void;
  label: string;
  value: IColor;
}

export const ColorSelection: React.FC<ColorSelectionProps> = React.memo(
  ({ onColorChange, label, value }) => {
    // État local pour la validité du code HEX et la valeur de l'input texte
    const [isValidHex, setIsValidHex] = React.useState(true);
    const [inputValue, setInputValue] = React.useState(value.stringValue());

    // Met à jour l'input si la couleur change
    React.useEffect(() => {
      setInputValue(value.stringValue());
      setIsValidHex(true);
    }, [value]);
    
    // Gère le changement de couleur (input color ou texte)
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const color = e.target.value;
      setInputValue(color);
      try {
        const newColor = new HEXColor(color);
        onColorChange(newColor);
        setIsValidHex(true);
      } catch {
        setIsValidHex(false);
      }
    };

    // Message d'erreur si le code HEX est invalide
    const ValidationMessage: React.FC = () => (
      <p className="text-xs text-red-500 mt-1">
        Please enter a valid hex color code (e.g., #FFFFFF).
      </p>
    );

    return (
      <div className="sticky top-0 z-10 bg-white">
        {/* Label du sélecteur */}
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>

        {/* Input color natif */}
        <div className="relative flex items-center space-x-4 mb-2 justify-center">
          <input
            type="color"
            value={value.stringValue()}
            onChange={handleColorChange}
            className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl group-hover:border-gray-100"
          />
        </div>

        {/* Input texte pour code HEX */}
        <div className="flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={handleColorChange}
            className={
              "w-full px-3 py-2 font-mono text-sm border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" +
              (isValidHex ? " border-blue-500" : " border-red-500")
            }
            placeholder="#000000"
          />
          {/* Affichage du message d'erreur si HEX invalide */}
          {!isValidHex && <ValidationMessage />}
        </div>
      </div>
    );
  }
);

ColorSelection.displayName = "ColorSelection";
