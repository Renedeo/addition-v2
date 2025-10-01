"use client";
import { IHEXColor, IHSLColor, IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorLightnessResult, IColorSaturationResult } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";


export interface ColorInformationProps {
  RGBValue: IRGBColor | undefined;
  HexValue: IHEXColor | undefined;
  HSLValue: IHSLColor | undefined;
  saturationInfo: IColorSaturationResult;
  luminanceInfo: IColorLightnessResult;
  primaryColor: string;
}
