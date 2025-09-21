"use client";
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import {
  HEXColor,
  HSLColor,
  RGBColor,
} from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IConverterRegistry } from "@/domain/Entity/ColorValue/core/interfaces/registry/registry.interface";
import { IColorSaturationResult } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";
import { ColorConversionFactory } from "@/domain/Entity/ColorValue/implementations/factory/ColorConversion.factory";
import { SaturationService } from "@/domain/Entity/ColorValue/implementations/services/colorAnalysis/saturation.service";

import { ColorConversionService } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/colorConversion.service";
import React from "react";

export default function Page() {
  const [selectedColor, setSelectedColor] = React.useState("#ffffff");
  const factory = new ColorConversionFactory();
  const registry: IConverterRegistry = factory.createDefaultRegistry();
  const conversionService = new ColorConversionService(registry); 
  const saturationService =  new SaturationService()
  const saturationInfo: IColorSaturationResult = saturationService.analyzeColor(toHEX(selectedColor));

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  return (
    <div className="p-5 font-sans bg-gray-50 min-h-screen">
      <p className="text-2xl font-bold text-gray-800 mb-4">
        Color Conversion Test
      </p>
      <p className="text-gray-600 mb-6">
        Test the color conversion functionality here.
      </p>
      <div className="mt-2 flex flex-col md:flex-row items-start gap-6">
        <ColorSelection onColorChange={handleColorChange} />
        <ColorInformation
          RGBValue={conversionService.convert<HEXColor, RGBColor>(
            toHEX(selectedColor),
            FormatConst.HEX,
            FormatConst.RGB
          )}
          HexValue={conversionService.convert<HEXColor, HEXColor>(
            toHEX(selectedColor),
            FormatConst.HEX,
            FormatConst.HEX
          )}
          HSLValue={conversionService.convert<HEXColor, HSLColor>(
            toHEX(selectedColor),
            FormatConst.HEX,
            FormatConst.HSL
          )}
          saturationInfo={saturationInfo}
        />
      </div>
    </div>
  );
}

interface ColorSelectionProps {
  onColorChange: (color: string) => void;
}

const ColorSelection: React.FC<ColorSelectionProps> = ({ onColorChange }) => {
  return (
    <div className="flex flex-col items-center">
      <label className="text-gray-700 font-medium mb-2">Select a Color:</label>
      <input
        type="color"
        onChange={(e) => onColorChange(e.target.value)}
        className="w-16 h-16 p-0 border-2 border-gray-300 rounded cursor-pointer shadow-sm"
      />
    </div>
  );
};

interface ConvertorProps {
  fromType: ColorFormat;
  toType: ColorFormat;
  onConvert: (convertedValue: string) => void;
}

const Convertor: React.FC<ConvertorProps> = ({
  fromType,
  toType,
  onConvert,
}) => {
  return <div>Convertor Component Placeholder</div>;
};

interface ColorInformationProps {
  RGBValue: RGBColor | undefined;
  HexValue: HEXColor | undefined;
  HSLValue: HSLColor | undefined;
  saturationInfo: IColorSaturationResult;
}
const ColorInformation: React.FC<ColorInformationProps> = ({
  RGBValue,
  HexValue,
  HSLValue,
  saturationInfo,
}) => {
  return (
    <div className="mt-4 p-4 border rounded w-fit bg-white shadow-md backdrop-blur-md bg-opacity-50 border-gray-300 border-opacity-30">
      <p className="text-lg font-semibold text-gray-800 mb-2">
        Color Information:
      </p>
      <div className="text-gray-700">
        <span className="block mb-1">
          <strong>{FormatConst.RGB}:</strong> {formatRGB(RGBValue)}
        </span>
        <span className="block mb-1">
          <strong>{FormatConst.HEX}:</strong> {formatHEX(HexValue)}
        </span>
        <span className="block">
          <strong>{FormatConst.HSL}:</strong> {formatHSL(HSLValue)}
        </span>
      </div>
      <div className="mt-4 text-gray-700">
        <p className="font-semibold mb-1">Saturation Analysis:</p>
        <p className="mb-1">
          <strong>Level:</strong> {saturationInfo.saturationLevel}
        </p>
        <p>
          <strong>Description:</strong> {saturationInfo.description}
        </p>
      </div>
    </div>
  );
};

function formatRGB(color: RGBColor | undefined): string {
  return color
    ? `rgb(${color.value.r}, ${color.value.g}, ${color.value.b}${
        color.a !== undefined ? `, ${Math.round(color.a * 100) / 100}` : ""
      })`
    : "Invalid RGB color";
}
function formatHSL(color: HSLColor | undefined): string {
  return color
    ? `hsl(${Math.round(color.value.h)}, ${Math.round(
        color.value.s
      )}%, ${Math.round(color.value.l)}%${
        color.a !== undefined ? `, ${Math.round(color.a * 100) / 100}` : ""
      })`
    : "Invalid HSL color";
}
function formatHEX(color: HEXColor | undefined): string {
  return color
    ? `${color.value.hex}${color.a !== undefined ? `, ${color.a}` : ""}`
    : "Invalid HEX color";
}

function toHEX(color: string): HEXColor {
  // Simple validation for hex color format
  if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    return { format: "HEX", value: { hex: color }, a: 1 } as HEXColor;
  }
  throw new Error("Invalid HEX color format");
}
