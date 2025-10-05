"use client";

import React from "react";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { HEXColor } from "@/domain/Entity/ColorValue/implementations/core/hex";
import { useColorServices, useColorAnalysis } from "@/hooks";
import { Header, ColorSelectionPanel, ColorInformationPanel } from "@/components/Tests/testComponents";

export default function Page() {

  const [primaryColor, setPrimaryColor] = React.useState<IHEXColor>(
    new HEXColor("#ff0000")
  );
  const [backgroundColor, setBackgroundColor] = React.useState<IHEXColor>(
    new HEXColor("#ffffff")
  );

  const services = useColorServices();
  const colorAnalysis = useColorAnalysis(primaryColor, services);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 flex justify-center">
      <div className="max-w-7xl mx-auto">
        <Header />
        <div className="flex flex-col items-center sm:flex-row justify-center gap-6 relative">
          <ColorSelectionPanel
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            setPrimaryColor={setPrimaryColor}
            setBackgroundColor={setBackgroundColor}
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

