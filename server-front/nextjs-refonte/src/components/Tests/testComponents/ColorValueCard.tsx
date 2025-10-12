"use client";
import React from "react";

/**
 * Props pour le composant ColorValueCard
 */
interface ColorValueCardProps {
  /** Label affiché en haut de la carte */
  label: string;
  /** Valeur de couleur à afficher */
  value: string;
  /** Thème de couleur de la carte */
  color: "blue" | "green" | "purple";
}

/**
 * Carte d'affichage d'une valeur de couleur avec thème colorisé.
 *
 * @component
 * @param {ColorValueCardProps} props - Les props du composant
 * @returns {JSX.Element} Carte stylisée avec la valeur de couleur
 */
export const ColorValueCard: React.FC<ColorValueCardProps> = ({ label, value, color }) => {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50",
    green: "border-green-200 bg-green-50",
    purple: "border-purple-200 bg-purple-50",
  };

  return (
    <div
      className={`${colorClasses[color]} border rounded-xl p-4 transition-all duration-200 hover:shadow-md `}
    >
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
      <p className="font-mono text-sm text-gray-900 break-all leading-relaxed">
        {value}
      </p>
    </div>
  );
};
