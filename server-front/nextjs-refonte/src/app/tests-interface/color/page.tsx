"use client";

import React, { useMemo } from "react";
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import {
  IHEXColor,
  IHSLColor,
  IRGBColor,
} from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IConverterRegistry } from "@/domain/Entity/ColorValue/core/interfaces/registry/registry.interface";
import { ColorConversionFactory } from "@/domain/Entity/ColorValue/implementations/factory/ColorConversion.factory";
import { LightnessService } from "@/domain/Entity/ColorValue/implementations/services/colorAnalysis/lightness.service";
import { SaturationService } from "@/domain/Entity/ColorValue/implementations/services/colorAnalysis/saturation.service";
import { ColorConversionService } from "@/domain/Entity/ColorValue/implementations/services/colorConversion/colorConversion.service";
import { ContrastRatio } from "@/components/Tests/testComponents/ContrastRatio";
import { ColorSelection } from "@/components/Tests/testComponents/ColorSelection";
import { LabelledColorDot } from "@/components/Tests/testComponents/LabelledColorDot";
import { ColorInformation } from "@/components/Tests/testComponents/ColorInformation";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { ColorFormatService } from "@/shared/services/colorFormat.service";
import { EnhanceColor } from "@/components/Tests/testComponents/enhance";
import { EnhanceSaturationService } from "@/domain/Entity/ColorValue/implementations/services/Enhance/enhanceSaturation.service";
import { EnhancedLightnessService } from "@/domain/Entity/ColorValue/implementations/services/Enhance/enhanceLightness.service";
import { ColorContrastService } from "@/domain/Entity/ColorValue/implementations/services/comparison/colorContrast.service";
import { HEXColor } from "@/domain/Entity/ColorValue/implementations/core/hex";

export default function Page() {
  const [primaryColor, setPrimaryColor] = React.useState<IHEXColor>(new HEXColor("#ff0000"));
  const [backgroundColor, setBackgroundColor] = React.useState<IHEXColor>(new HEXColor("#ffffff"));

  // Memoize services to avoid recreating on each render
  const services = useMemo(() => {
    const factory = new ColorConversionFactory();
    const registry: IConverterRegistry = factory.createDefaultRegistry();
    const conversionService = new ColorConversionService(registry);
    const colorFormatter:IColorFormatHandler = new ColorFormatService(conversionService);
    const lightnessService = new LightnessService(colorFormatter);
    const saturationService = new SaturationService(colorFormatter);
    const enhanceSaturationService = new EnhanceSaturationService(colorFormatter);
    const enhanceLightnessService = new EnhancedLightnessService(colorFormatter);
    const contrastService = new ColorContrastService(colorFormatter, lightnessService);

    return {
      conversionService,
      saturationService,
      lightnessService,
      enhanceSaturationService,
      enhanceLightnessService,
      contrastService,
    };
  }, []);

  // Memoize color analysis to avoid recalculation
  const colorAnalysis = useMemo(() => {
    try {
      return {
        saturationInfo: services.saturationService.analyzeColor(primaryColor),
        luminanceInfo: services.lightnessService.analyzeColor(primaryColor),
        rgbValue: services.conversionService.convert<IHEXColor, IRGBColor>(
          primaryColor,
          FormatConst.HEX,
          FormatConst.RGB
        ),
        hexValue: services.conversionService.convert<IHEXColor, IHEXColor>(
          primaryColor,
          FormatConst.HEX,
          FormatConst.HEX
        ),
        hslValue: services.conversionService.convert<IHEXColor, IHSLColor>(
          primaryColor,
          FormatConst.HEX,
          FormatConst.HSL
        ),
      };
    } catch {
      return null;
    }
  }, [primaryColor, services]);

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
        {/* <>{primaryColor.toString()}</> */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <div className="flex *:grow flex-col sm:flex-row justify-center items-center gap-6 relative">
          {/* Color Selection Panel */}
          <div className="flex flex-col gap-6 w-full sm:w-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 sticky top-6 w-full sm:*:w-auto">
              <LabelledColorDot
                color={primaryColor}
                label="Color Selection"
              />
              <div className="flex justify-evenly w-full sm:w-fit sm:flex-col gap-6 sm:gap-4 mt-4">
                <ColorSelection
                  onColorChange={setPrimaryColor}
                  label="Primary Color"
                  value={primaryColor}
                />
                <ColorSelection
                  onColorChange={setBackgroundColor}
                  label="Background Color"
                  value={backgroundColor}
                />
              </div>
            </div>
            <div>
              <LabelledColorDot color={primaryColor} label="Enhance" />

              <EnhanceColor
                color={primaryColor}
                enhancementType="saturation"
                amount={(colorAnalysis?.saturationInfo.saturation || 0)}
                lightnessService={services.enhanceLightnessService}
                saturationService={services.enhanceSaturationService}
                onChange={setPrimaryColor}
              />
              <EnhanceColor
                color={primaryColor}
                enhancementType="lightness"
                amount={(colorAnalysis?.luminanceInfo.lightness || 0)}
                lightnessService={services.enhanceLightnessService}
                saturationService={services.enhanceSaturationService}
                onChange={(setPrimaryColor)}
              />
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
                primaryColor={primaryColor}
              />
            )}

            <ContrastRatio
              Foreground={primaryColor}
              Background={backgroundColor}
              contrastService={services.contrastService}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
