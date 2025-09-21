"use client";
import { ColorInformationProps } from "@/components/Tests/core/interfaces/component.test.interface";
import { formatRGB, formatHEX, formatHSL } from "@/components/Tests/core/utils/testComponent.utils";
import { AnalysisCard } from "@/components/Tests/testComponents/AnalysisCard";
import { ColorIndicator } from "@/components/Tests/testComponents/ColorIndicator";
import { ColorValueCard } from "@/components/Tests/testComponents/ColorValueCard";
import { LabelledColorDot } from "@/components/Tests/testComponents/LabelledColorDot";
import React from "react";

export const ColorInformation: React.FC<ColorInformationProps> = React.memo(
  ({
    RGBValue, HexValue, HSLValue, saturationInfo, luminanceInfo, primaryColor,
  }) => {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <LabelledColorDot color={primaryColor} label="Color Information" />
          <ColorIndicator color={primaryColor} />
        </div>
        {/* Color Values */}
        <div className="flex gap-4 mb-6 *:grow *:flex *:flex-col *:items-center *:justify-center">
          <ColorValueCard
            label="RGB"
            value={formatRGB(RGBValue)}
            color="blue" />
          <ColorValueCard
            label="HEX"
            value={formatHEX(HexValue)}
            color="green" />
          <ColorValueCard
            label="HSL"
            value={formatHSL(HSLValue)}
            color="purple" />
        </div>

        {/* Analysis */}
        <div className="flex *:grow gap-4 md:gap-6">
          <AnalysisCard
            title="Saturation Analysis"
            level={saturationInfo.saturationLevel}
            description={saturationInfo.description}
            icon="🎨" />
          <AnalysisCard
            title="Lightness Analysis"
            level={luminanceInfo.lightnessLevel}
            description={luminanceInfo.description}
            icon="💡" />
        </div>
      </div>
    );
  }
);

ColorInformation.displayName = "ColorInformation";
