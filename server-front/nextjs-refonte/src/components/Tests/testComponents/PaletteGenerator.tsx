"use client";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { DarkenPaletteService, LightenPaletteService, SaturatePaletteService, DesaturatePaletteService } from "@/domain/Entity/ColorValue/implementations/services/palette/palette.service";
import React from "react";

/**
 * Composant générateur de palettes de couleurs.
 * Génère automatiquement 4 types de palettes basées sur une couleur principale :
 * - Darken (assombrir)
 * - Lighten (éclaircir) 
 * - Saturate (saturer)
 * - Desaturate (désaturer)
 * 
 * @component
 * @param {Object} props - Les props du composant
 * @param {IHEXColor} props.primaryColor - Couleur principale pour générer les palettes
 * @param {IColorFormatHandler} props.colorFormatter - Service de formatage des couleurs
 * 
 * @returns {JSX.Element} Le composant PaletteGenerator avec 4 sections de palettes
 * 
 * @example
 * ```tsx
 * <PaletteGenerator 
 *   primaryColor={new HEXColor('#ff5733')}
 *   colorFormatter={colorFormatterService}
 * />
 * ```
 */
export function PaletteGenerator({
  primaryColor, colorFormatter,
}: {
  primaryColor: IHEXColor;
  colorFormatter: IColorFormatHandler;
}) {
  const paletteServices = {
    darken: new DarkenPaletteService(primaryColor, colorFormatter),
    lighten: new LightenPaletteService(primaryColor, colorFormatter),
    saturate: new SaturatePaletteService(primaryColor, colorFormatter),
    desaturate: new DesaturatePaletteService(primaryColor, colorFormatter),
  };

  const palette = Object.fromEntries(
    Object.entries(paletteServices).map(([key, service]) => [key, service.generatePalette(20)])
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Color Palette Generator</h2>
      {Object.entries(palette).map(([key, colors]) => (
        <PaletteSection key={key} title={key} colors={colors as IHEXColor[]} />
      ))}
    </div>
  );
}

/**
 * Section d'affichage d'une palette de couleurs spécifique.
 * Affiche le titre de la palette et une grille de couleurs.
 * 
 * @component
 * @param {Object} props - Les props du composant
 * @param {string} props.title - Titre de la section de palette (darken, lighten, etc.)
 * @param {IHEXColor[]} props.colors - Tableau des couleurs à afficher
 * 
 * @returns {JSX.Element} Une section avec titre et grille de couleurs
 */
function PaletteSection({ title, colors }: { title: string; colors: IHEXColor[]; }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        {title.charAt(0).toUpperCase() + title.slice(1)} Palette
      </h3>
      <div className="grid grid-cols-10 gap-1">
        {colors.map((color, index) => (
          <div
            key={index}
            title={color.stringValue()}
            className="w-8 h-8 rounded-md border border-gray-300 shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer"
            style={{ backgroundColor: color.stringValue() }} />
        ))}
      </div>
    </div>
  );
}
