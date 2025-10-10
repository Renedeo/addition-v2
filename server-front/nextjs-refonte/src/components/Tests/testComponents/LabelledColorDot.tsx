"use client";
import React from "react"; 



// Composant React fonctionnel pour afficher un point coloré avec un label associé.
// Utilisé pour légender une couleur dans l'interface utilisateur.

/**
 * A React functional component that renders a labeled color dot.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.color - The color string used to determine the background color of the dot.
 * @param {string} props.label - The label text displayed next to the color dot.
 * 
 * @returns {React.JSX.Element} A JSX element containing a colored dot with a label.
 * 
 * @example
 * ```tsx
 * <LabelledColorDot color="#ff0000" label="Example Label" />
 * ```
 */
export const LabelledColorDot: React.FC<{ color: string; label: string; }> = ({
  color, label,
}): React.JSX.Element => (
  <div className="flex items-center gap-2.5">
    {/* Point coloré avec une bordure */}
    <div
      className="w-4 h-4 rounded-full border border-gray-300"
      style={{ backgroundColor: color }}
    ></div>
    {/* Label associé au point */}
    <span className="text-xs text-gray-700 font-medium">{label}</span>
  </div>
);

