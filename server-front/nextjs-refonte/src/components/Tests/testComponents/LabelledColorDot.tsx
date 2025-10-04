"use client";
import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import React from "react"; 



export const LabelledColorDot: React.FC<{ color: IColor; label: string; }> = ({
  color, label,
}): React.JSX.Element => (
  <div className="flex items-center gap-2.5">
    <div
      className={`w-4 h-4 rounded-full border border-gray-300`}
      style={{ backgroundColor: color.stringValue() }}
    ></div>
    <span className="text-xs text-gray-700 font-medium">{label}</span>
  </div>
);
/**
 * Affiche un dot coloré avec un label associé.
 * Utilisé pour légender une couleur dans l'interface.
 *
 * Props :
 * - color : Instance de IColor, doit fournir la méthode stringValue() pour obtenir la couleur CSS.
 * - label : Texte associé au dot
 */
