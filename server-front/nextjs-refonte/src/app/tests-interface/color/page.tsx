"use client";

import React, { useMemo, useCallback } from "react";
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import {
  HEXColor,
  HSLColor,
  RGBColor,
} from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IConverterRegistry } from "@/domain/Entity/ColorValue/core/interfaces/registry/registry.interface";
import { ColorConversionFactory } from "@/domain/Entity/ColorValue/implementations/factory/ColorConversion.factory";
import { LightnessService } from "@/domain/Entity/ColorValue/implementations/services/colorAnalysis/lightness.service";
import { SaturationService } from "@/domain/Entity/ColorValue/implementations/services/colorAnalysis/saturation.service";
import { ColorConversionService } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/colorConversion.service";
import { ContrastRatio } from "@/components/Tests/testComponents/ContrastRatio";
import { ColorSelection } from "@/components/Tests/testComponents/ColorSelection";
import { LabelledColorDot } from "@/components/Tests/testComponents/LabelledColorDot";
import { toHEX } from "@/components/Tests/core/utils/testComponent.utils";
import { ColorInformation } from "@/components/Tests/testComponents/ColorInformation";

export default function Page() {
  const [highlightedColor, setHighlightedColor] = React.useState("#3b82f6");
  const [backgroundColor, setBackgroundColor] = React.useState("#ffffff");

  // Memoize services to avoid recreating on each render
  const services = useMemo(() => {
    const factory = new ColorConversionFactory();
    const registry: IConverterRegistry = factory.createDefaultRegistry();

    return {
      conversionService: new ColorConversionService(registry),
      saturationService: new SaturationService(),
      lightnessService: new LightnessService(),
    };
  }, []);

  // Memoize color analysis to avoid recalculation
  const colorAnalysis = useMemo(() => {
    try {
      const hexColor = toHEX(highlightedColor);
      return {
        saturationInfo: services.saturationService.analyzeColor(hexColor),
        luminanceInfo: services.lightnessService.analyzeColor(hexColor),
        rgbValue: services.conversionService.convert<HEXColor, RGBColor>(
          hexColor,
          FormatConst.HEX,
          FormatConst.RGB
        ),
        hexValue: services.conversionService.convert<HEXColor, HEXColor>(
          hexColor,
          FormatConst.HEX,
          FormatConst.HEX
        ),
        hslValue: services.conversionService.convert<HEXColor, HSLColor>(
          hexColor,
          FormatConst.HEX,
          FormatConst.HSL
        ),
      };
    } catch {
      return null;
    }
  }, [highlightedColor, services]);

  const handleColorChange = useCallback(
    (color: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
      setter(color);
    },
    []
  );

  const Header: React.FC = () => (
    <div className="text-center mb-8 sm:mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
        <div className="w-8 h-8 bg-white rounded-lg opacity-90"></div>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
        Color Analysis Studio
      </h1>

      <p className="text-gray-600">
        Professional color analysis with accessibility insights, format
        conversions, and contrast ratios
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 flex justify-center">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <div className="flex *:grow justify-center items-center gap-6 ">
          {/* Color Selection Panel */}
          <div className="xl:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 sticky top-6">
              <LabelledColorDot
                color={highlightedColor}
                label="Color Selection"
              />
              <div className="space-y-6">
                <ColorSelection
                  label="Primary Color"
                  value={highlightedColor}
                  onColorChange={(color) =>
                    handleColorChange(color, setHighlightedColor)
                  }
                />
                <ColorSelection
                  label="Background Color"
                  value={backgroundColor}
                  onColorChange={(color) =>
                    handleColorChange(color, setBackgroundColor)
                  }
                />
              </div>
            </div>
          </div>

          {/* Color Information Panel */}
          <div className="flex flex-col gap-3.5">
            {colorAnalysis && (
              <ColorInformation
                RGBValue={colorAnalysis.rgbValue}
                HexValue={colorAnalysis.hexValue}
                HSLValue={colorAnalysis.hslValue}
                saturationInfo={colorAnalysis.saturationInfo}
                luminanceInfo={colorAnalysis.luminanceInfo}
                primaryColor={highlightedColor}
              />
            )}

            <ContrastRatio
              Foreground={toHEX(highlightedColor)}
              Background={toHEX(backgroundColor)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}




