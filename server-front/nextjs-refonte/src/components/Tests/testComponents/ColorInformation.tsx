
"use client";
import { ColorInformationProps } from "@/components/Tests/core/interfaces/component.test.interface";
import { AnalysisCard } from "@/components/Tests/testComponents/AnalysisCard";
import { ColorIndicator } from "@/components/Tests/testComponents/ColorIndicator";
import { ColorValueCard } from "@/components/Tests/testComponents/ColorValueCard";
import { LabelledColorDot } from "@/components/Tests/testComponents/LabelledColorDot";
import { IHEXColor, IHSLColor, IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import React from "react";

/**
 * Composant principal d'affichage des informations d'une couleur.
 * Affiche les valeurs RGB, HEX, HSL, ainsi que l'analyse de la saturation et de la luminosité.
 *
 * Props (ColorInformationProps) :
 * - RGBValue : Instance IRGBColor
 * - HexValue : Instance IHEXColor
 * - HSLValue : Instance IHSLColor
 * - saturationInfo : { saturationLevel: string, description: string }
 * - luminanceInfo : { lightnessLevel: string, description: string }
 * - primaryColor : Couleur principale (IColor)
 */
export const ColorInformation: React.FC<ColorInformationProps> = React.memo(
  ({
    RGBValue, HexValue, HSLValue, saturationInfo, luminanceInfo, primaryColor,
  }) => {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
        {/* En-tête avec dot et indicateur de couleur */}
        <div className="flex justify-between items-center mb-6">
          <LabelledColorDot color={primaryColor.stringValue()} label="Color Information" />
          <ColorIndicator color={primaryColor} />
        </div>
        {/* Valeurs de couleur (RGB, HEX, HSL) */}
        <div className="flex gap-4 mb-6 *:grow *:flex *:flex-col *:items-center *:justify-center">
          <ColorValueCard
            label="RGB"
            value={(RGBValue as IRGBColor).stringValue()}
            color="blue" />
          <ColorValueCard
            label="HEX"
            value={(HexValue as IHEXColor).stringValue()}
            color="green" />
          <ColorValueCard
            label="HSL"
            value={(HSLValue as IHSLColor).stringValue()}
            color="purple" />
        </div>

        {/* Analyse de la couleur */}
        <div className="flex *:grow gap-4 md:gap-6">
          <AnalysisCard
            title="Saturation Analysis"
            level={saturationInfo.saturationLevel}
            description={saturationInfo.description}
            icon="🎨" />
          <AnalysisCard
            title="Lightness Analysis"
            level={luminanceInfo.lightnessLevel}
            description={luminanceInfo.description}
            icon="💡" />
        </div>
      </div>
    );
  }
);

ColorInformation.displayName = "ColorInformation";
