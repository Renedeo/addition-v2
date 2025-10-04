
import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import React from "react";

/**
 * Indicateur visuel d'une couleur, affichant un rond coloré.
 * Utilisé pour représenter une couleur dans l'interface (ex : sélection, légende).
 *
 * Props :
 * - color : Instance de IColor, doit fournir la méthode stringValue() pour obtenir la couleur CSS.
 */
export const ColorIndicator: React.FC<{ color: IColor }> = ({ color }) => {
  return (
    <div
      className="ml-auto w-8 h-8 rounded-full shadow-sm border-2 border-white"
      style={{ backgroundColor: color.stringValue() }}
    ></div>
  );
};
