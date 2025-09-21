"use client";
import { HEXColor, HSLColor, RGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorLightnessResult, IColorSaturationResult } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";

export interface ContrastRatioProps {
  Foreground: HEXColor;
  Background: HEXColor;
}

export interface ColorSelectionProps {
  onColorChange: (color: string) => void;
  label: string;
  value: string;
}

export interface ColorInformationProps {
  RGBValue: RGBColor | undefined;
  HexValue: HEXColor | undefined;
  HSLValue: HSLColor | undefined;
  saturationInfo: IColorSaturationResult;
  luminanceInfo: IColorLightnessResult;
  primaryColor: string;
}
