"use client";

import React from "react";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { HEXColor } from "@/domain/Entity/ColorValue/implementations/core/hex";
import { useColorServices } from "@/hooks/useColorServices";
import { useColorAnalysis } from "@/hooks/useColorAnalysis";
import { Header } from "@/components/Tests/testComponents/Header";
import { ColorSelectionPanel } from "@/components/Tests/testComponents/ColorSelectionPanel";
import { ColorInformationPanel } from "@/components/Tests/testComponents/ColorInformationPanel";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";
import { DarkenPaletteService, DesaturatePaletteService, LightenPaletteService, SaturatePaletteService } from "@/domain/Entity/ColorValue/implementations/services/Palette/palette.service";

// Mémoriser les couleurs initiales pour éviter les recréations
const INITIAL_PRIMARY_COLOR = new HEXColor("#ff0000");
const INITIAL_BACKGROUND_COLOR = new HEXColor("#ffffff");

export default function Page() {
  const [primaryColor, setPrimaryColor] = React.useState<IHEXColor>(INITIAL_PRIMARY_COLOR);
  const [backgroundColor, setBackgroundColor] = React.useState<IHEXColor>(INITIAL_BACKGROUND_COLOR);

  const services = useColorServices();
  const colorAnalysis = useColorAnalysis(primaryColor, services);
  
  // Mémoriser les gestionnaires pour éviter les re-renders inutiles
  const handlePrimaryColorChange = React.useCallback((color: IHEXColor) => {
    setPrimaryColor(color);
  }, []);
  
  const handleBackgroundColorChange = React.useCallback((color: IHEXColor) => {
    setBackgroundColor(color);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 flex justify-center">
      <div className="max-w-7xl mx-auto">
        <Header />
        <div className="flex flex-col items-center sm:flex-row justify-center gap-6 relative">
          <ColorSelectionPanel
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            setPrimaryColor={handlePrimaryColorChange}
            setBackgroundColor={handleBackgroundColorChange}
            services={services}
            colorAnalysis={colorAnalysis}
          />
          <ColorInformationPanel
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            colorAnalysis={colorAnalysis}
            services={services}
          />
          {services && <PaletteGenerator primaryColor={primaryColor} colorFormatter={services.colorFormatter} />}
        </div>
      </div>
    </div>
  );
}

function PaletteGenerator({
  primaryColor,
  colorFormatter,
}: { primaryColor: IHEXColor; colorFormatter: IColorFormatHandler  }) {
const paletteService = {
  darken: new DarkenPaletteService(primaryColor, colorFormatter),
  lighten: new LightenPaletteService(primaryColor, colorFormatter),
  saturate: new SaturatePaletteService(primaryColor, colorFormatter),
  desaturate: new DesaturatePaletteService(primaryColor, colorFormatter),
};
console.log("Palette services initialized:", paletteService);

const palette = {
  darken: paletteService.darken.generatePalette(20),
  lighten: paletteService.lighten.generatePalette(20),
  saturate: paletteService.saturate.generatePalette(20),
  desaturate: paletteService.desaturate.generatePalette(20),
};

  return (
    <div className="w-52">
      Service de palette de couleurs
      {Object.entries(palette).map(([key, colors]) => (
        <div key={key} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{key.charAt(0).toUpperCase() + key.slice(1)} Palette</h3>
          <div className="space-x-2 flex flex-wrap">
            {colors.map((color, index) => (
              <div key={index} title={color.stringValue()} className="w-5 h-5 my-1 mr-1" style={{ backgroundColor: color.stringValue() }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )

}
