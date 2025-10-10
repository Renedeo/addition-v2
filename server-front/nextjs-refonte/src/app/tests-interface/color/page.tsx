"use client";

import React from "react";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { HEXColor } from "@/domain/Entity/ColorValue/implementations/core/hex";
import { useColorServices } from "@/hooks/useColorServices";
import { useColorAnalysis } from "@/hooks/useColorAnalysis";
import { Header } from "@/components/Tests/testComponents/Header";
import { ColorSelectionPanel } from "@/components/Tests/testComponents/ColorSelectionPanel";
import { ColorInformationPanel } from "@/components/Tests/testComponents/ColorInformationPanel";
import { ColorServicesHookResult } from "@/hooks/types";
import { PaletteGenerator } from "@/components/Tests/testComponents/PaletteGenerator";

// Mémoriser les couleurs initiales pour éviter les recréations
const INITIAL_PRIMARY_COLOR = new HEXColor("#ff0000");
const INITIAL_BACKGROUND_COLOR = new HEXColor("#ffffff");

export default function Page() {
  const [primaryColor, setPrimaryColor] = React.useState<IHEXColor>(
    INITIAL_PRIMARY_COLOR
  );
  const [backgroundColor, setBackgroundColor] = React.useState<IHEXColor>(
    INITIAL_BACKGROUND_COLOR
  );

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
        {services && (
          <PaletteGenerator
            primaryColor={primaryColor}
            colorFormatter={services?.colorFormatter}
            onClick={handlePrimaryColorChange}
          />
        )}
        <div className="flex flex-col items-center sm:items-start sm:flex-row justify-center gap-6 relative">
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
        </div>
      </div>
    </div>
  );
}
