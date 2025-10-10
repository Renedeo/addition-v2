"use client";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ILightnessAdjustmentService } from "@/domain/Entity/ColorValue/core/interfaces/service/lightnessAdjustment.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { DarkenPaletteService, LightenPaletteService } from "@/domain/Entity/ColorValue/implementations/services/ColorPalette/LightnessPalette.service";
import { DesaturatePaletteService, SaturatePaletteService } from "@/domain/Entity/ColorValue/implementations/services/ColorPalette/saturatePalette.service";
import { LightnessAdjustmentService } from "@/domain/Entity/ColorValue/implementations/services/Enhance/lightnessAdjustment.service";
import { SaturationAdjustmentService } from "@/domain/Entity/ColorValue/implementations/services/Enhance/saturationAdjustment.service";
import React from "react";

export function PaletteGenerator({
  primaryColor, colorFormatter, onClick,
}: {
  primaryColor: IHEXColor;
  colorFormatter: IColorFormatHandler;
  onClick: (color: IHEXColor) => void;
}) {
  if (!colorFormatter) return null;

  const lightnessAdjustmentService: ILightnessAdjustmentService = new LightnessAdjustmentService(colorFormatter);
  const saturationAdjustmentService = new SaturationAdjustmentService(colorFormatter);

  const darkenService = new DarkenPaletteService(
    primaryColor,
    lightnessAdjustmentService
  );
  const lightenService = new LightenPaletteService(
    primaryColor,
    lightnessAdjustmentService
  );

  const saturateService = new SaturatePaletteService(
    primaryColor,
    saturationAdjustmentService
  );

  const desaturateService = new DesaturatePaletteService(
    primaryColor,
    saturationAdjustmentService
  );

  return (
    <div>
      <h2>Palette Generator</h2>
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 mb-6">
        <div className="flex flex-col gap-2 mt-2">
          <h2>Darkened Colors</h2>
          <div>
            {darkenService.generatePalette(20).map((color, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded inline-block mr-2"
                style={{ backgroundColor: color.stringValue() }}
                title={color.stringValue()}
                onClick={() => onClick(color as IHEXColor)} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <h2>Lightened Colors</h2>
          <div>
            {lightenService.generatePalette(20).map((color, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded inline-block mr-2"
                style={{ backgroundColor: color.stringValue() }}
                title={color.stringValue()}
                onClick={() => onClick(color as IHEXColor)} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <h2>Saturated Colors</h2>
          <div>
            {saturateService.generatePalette(20).map((color, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded inline-block mr-2"
                style={{ backgroundColor: color.stringValue() }}
                title={color.stringValue()}
                onClick={() => onClick(color as IHEXColor)} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <h2>Desaturated Colors</h2>
          <div>
            {desaturateService.generatePalette(20).map((color, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded inline-block mr-2"
                style={{ backgroundColor: color.stringValue() }}
                title={color.stringValue()}
                onClick={() => onClick(color as IHEXColor)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
