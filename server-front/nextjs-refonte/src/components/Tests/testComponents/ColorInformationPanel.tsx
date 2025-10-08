"use client";
import React from "react";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ColorInformation } from "@/components/Tests/testComponents/ColorInformation";
import { ContrastRatio } from "@/components/Tests/testComponents/ContrastRatio";
import { ColorServicesHookResult, ColorAnalysisHookResult } from "@/hooks/types";

/**
 * Props pour le composant ColorInformationPanel
 */
export interface ColorInformationPanelProps {
  primaryColor: IHEXColor;
  backgroundColor: IHEXColor;
  colorAnalysis: ColorAnalysisHookResult;
  services: ColorServicesHookResult;
}

/**
 * Panel d'affichage des informations de couleur et du ratio de contraste.
 * 
 * Ce composant affiche les informations détaillées sur la couleur sélectionnée
 * (RGB, HEX, HSL, saturation, luminance) ainsi que le ratio de contraste
 * avec la couleur de fond.
 * 
 * @component
 * @param {ColorInformationPanelProps} props - Les props du composant
 * @returns {JSX.Element} Le composant ColorInformationPanel
 * 
 * @example
 * ```tsx
 * <ColorInformationPanel
 *   primaryColor={primaryColor}
 *   backgroundColor={backgroundColor}
 *   colorAnalysis={colorAnalysis}
 *   services={services}
 * />
 * ```
 */
export const ColorInformationPanel: React.FC<ColorInformationPanelProps> = React.memo(
  ({ primaryColor, backgroundColor, colorAnalysis, services }) => {
    // Mémoriser les données d'analyse pour éviter les re-renders inutiles
    const colorInformationProps = React.useMemo(() => {
      if (!colorAnalysis) return null;
      
      return {
        RGBValue: colorAnalysis.rgbValue,
        HexValue: colorAnalysis.hexValue,
        HSLValue: colorAnalysis.hslValue,
        saturationInfo: colorAnalysis.saturationInfo,
        luminanceInfo: colorAnalysis.luminanceInfo,
        primaryColor: primaryColor
      };
    }, [colorAnalysis, primaryColor]);
    // Mémoriser les props du contraste
    const contrastProps = React.useMemo(() => {
      if (!services) return null;
      
      return {
        Foreground: primaryColor,
        Background: backgroundColor,
        contrastService: services.contrastService
      };
    }, [primaryColor, backgroundColor, services]);
    
    return (
      <div className="flex flex-col gap-3.5">
        {/* Color Information Section */}
        {colorInformationProps && (
          <ColorInformation {...colorInformationProps} />
        )}

        {/* Contrast Ratio Section */}
        {contrastProps && (
          <ContrastRatio {...contrastProps} />
        )}
      </div>
    );
  }
);

ColorInformationPanel.displayName = "ColorInformationPanel";