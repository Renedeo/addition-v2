"use client";
import React, { useMemo, useEffect } from "react";

/**
 * Props pour le composant ColorSelection
 */
export interface ColorSelectionProps {
  /** Callback appelé lorsqu'une couleur est sélectionnée */
  onColorSelected: (color: string) => void;
  /** Label affiché au-dessus du sélecteur */
  label: string;
  /** Couleur actuellement active */
  activeColor: string;
}

/**
 * Composant de sélection de couleur avec input de type color et input texte HEX synchronisés.
 * Les deux champs se mettent à jour mutuellement pour maintenir la cohérence.
 * 
 * @component
 * @param {ColorSelectionProps} props - Les props du composant
 * @returns {JSX.Element} Le composant ColorSelection
 * 
 * @example
 * ```tsx
 * <ColorSelection
 *   onColorSelected={(color) => console.log(color)}
 *   label="Couleur principale"
 *   activeColor="#ff5733"
 * />
 * ```
 */
export const ColorSelection: React.FC<ColorSelectionProps> = React.memo(
  ({ onColorSelected, label, activeColor }) => {
    const [inputValue, setInputValue] = React.useState(activeColor);

    // Synchroniser l'état local avec la prop activeColor
    useEffect(() => {
      setInputValue(activeColor);
    }, [activeColor]);

    const onChange = React.useCallback(
      (newColor: string) => {
        setInputValue(newColor);
        onColorSelected(newColor);
      },
      [onColorSelected]
    );

    return (
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/10 max-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
        <div className="relative flex items-center space-x-4 mb-2 justify-center">
          <ColorInputField
            value={inputValue}
            onColorChange={onChange}
          />
        </div>
        <div className="flex-1">
          <HexTextInputField
            value={inputValue}
            onColorChange={onChange}
          />
        </div>
      </div>
    );
  }
);

/**
 * Input de type color pour la sélection de couleur.
 * Se synchronise automatiquement avec l'input texte.
 */
function ColorInputField({
  value,
  onColorChange,
}: {
  /** Valeur actuelle de la couleur */
  value: string;
  /** Callback appelé lors du changement de couleur */
  onColorChange: (value: string) => void;
}) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onColorChange(event.target.value);
    },
    [onColorChange]
  );

  return (
    <input
      type="color"
      value={value}
      className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl group-hover:border-gray-100"
      onChange={handleChange}
    />
  );
}

/**
 * Input texte pour saisir une couleur HEX.
 * Valide le format HEX et se synchronise avec l'input color.
 * Permet la saisie de valeurs temporairement invalides pendant la frappe.
 */
function HexTextInputField({
  value,
  onColorChange,
}: {
  /** Valeur actuelle de la couleur */
  value: string;
  /** Callback appelé lors du changement de couleur valide */
  onColorChange: (value: string) => void;
}) {
  // Regex pour valider le format HEX (6 caractères hexadécimaux avec #)
  const HEX_COLOR_REGEX = useMemo(() => /^#([0-9A-Fa-f]{6})$/, []);
  
  // État local pour l'input text (permet la saisie de valeurs invalides temporaires)
  const [textValue, setTextValue] = React.useState(value);

  // Synchroniser avec la valeur externe
  React.useEffect(() => {
    setTextValue(value);
  }, [value]);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setTextValue(newValue);
      
      // Ne propager que si la valeur est valide
      if (HEX_COLOR_REGEX.test(newValue)) {
        onColorChange(newValue);
      }
    },
    [onColorChange, HEX_COLOR_REGEX]
  );

  const isValid = HEX_COLOR_REGEX.test(textValue);

  return (
    <input
      type="text"
      maxLength={7}
      minLength={1}
      value={textValue}
      onChange={handleChange}
      className={`w-full px-3 py-2 font-mono text-sm border rounded-lg focus:ring-2 outline-none transition-all duration-200 ${
        isValid
          ? "border-blue-500 focus:ring-blue-500"
          : "border-red-500 focus:ring-red-500"
      }`}
      placeholder="#000000"
    />
  );
}


ColorSelection.displayName = "ColorSelection";
