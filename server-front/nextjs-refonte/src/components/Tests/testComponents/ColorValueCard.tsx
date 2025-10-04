"use client";
import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color";
import React from "react";

/**
 * Card affichant une valeur de couleur (ex : HEX, RGB, HSL) avec un label et une couleur d'accent.
 * Utilisé pour présenter les différentes représentations d'une couleur.
 *
 * Props :
 * - label : Type de valeur (ex : "HEX", "RGB", "HSL")
 * - value : Valeur à afficher (string)
 * - color : Couleur d'accent pour le label
 */
export const ColorValueCard: React.FC<{
  label: string;
  value: IColor;
  color: "blue" | "green" | "purple";
}> = ({ label, value, color }) => {
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
        {value.stringValue()}
      </p>
    </div>
  );
};
