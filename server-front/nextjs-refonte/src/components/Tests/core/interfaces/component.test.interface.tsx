"use client";
import { IColor, IHEXColor, IHSLColor, IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorLightnessResult, IColorSaturationResult } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";

/**
 * Props pour le composant ColorInformation.
 * Définit toutes les données nécessaires à l'affichage des informations d'une couleur.
 */
export interface ColorInformationProps {
  /** Valeur de la couleur convertie en RGB */
  RGBValue: IRGBColor | undefined;
  /** Valeur de la couleur convertie en HEX */
  HexValue: IHEXColor | undefined;
  /** Valeur de la couleur convertie en HSL */
  HSLValue: IHSLColor | undefined;
  /** Résultat de l'analyse de saturation */
  saturationInfo: IColorSaturationResult;
  /** Résultat de l'analyse de luminosité */
  luminanceInfo: IColorLightnessResult;
  /** Couleur principale de référence */
  primaryColor: IColor;
}
